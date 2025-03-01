import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { SignUpDto } from '../auth/dto/auth.dto';
import { UserDto } from './dto/user.dto';
import { generateCompleteNickname } from '@/utils/nickname-generator';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * 根据条件查找用户
   * @param userWhereUniqueInput
   * @returns User
   */
  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /**
   * 创建用户
   * @param newUser
   * @returns User
   */
  async create(newUser: SignUpDto | UserDto) {
    return this.prismaService.$transaction(async (prisma) => {
      try {
        // 检查邮箱是否已经存在
        const existingUser = await prisma.user.findUnique({
          where: { email: newUser.email },
        });

        if (existingUser) {
          throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
        }

        // 默认角色ID为6（普通用户）
        const defaultRoleId = 6;
        const defaultPassword = '123456';

        // 如果没有提供密码，则使用默认密码
        const password = newUser.password
          ? this.cryptoService.encrypt(newUser.password)
          : this.cryptoService.encrypt(defaultPassword);

        // 判断是否有填写昵称，如果没有则设置随机昵称
        if (!newUser.nickName) {
          newUser.nickName = generateCompleteNickname();
        }

        // 创建用户
        const user = await prisma.user.create({
          data: {
            email: newUser.email,
            nickName: newUser.nickName,
            password: password,
          },
        });

        // 分配角色
        const roleId = newUser.roleId || defaultRoleId;
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: roleId,
          },
        });

        return user;
      } catch (error) {
        throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: error,
        });
      }
    });
  }

  /**
   * 查找所有用户
   * @param params
   * @returns User[]
   */
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<any[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return users.map((user) => ({
      ...user,
      roles: user.userRoles.map((userRole) => userRole.role),
      userRoles: undefined, // 移除 userRoles 字段
    }));
  }

  /**
   * 更新用户
   * @param params
   * @returns User
   */
  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  /**
   * 删除用户
   * @param where
   * @returns User
   */
  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.$transaction(async (prisma) => {
      // 删除用户角色关联表中的记录
      await prisma.userRole.deleteMany({
        where: {
          userId: where.id,
        },
      });

      // 删除用户
      return prisma.user.delete({
        where,
      });
    });
  }
}
