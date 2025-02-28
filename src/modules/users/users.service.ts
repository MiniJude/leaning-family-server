import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { SignUpDto } from '../auth/dto/auth.dto';

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
   * @param signUpDto
   * @returns User
   */
  async create(signUpDto: SignUpDto) {
    return this.prismaService.$transaction(async (prisma) => {
      try {
        // 默认角色ID为6（普通用户）
        const defaultRoleId = 6;
        const defaultPassword = '123456';

        // 如果没有提供密码，则使用默认密码
        const password = signUpDto.password
          ? this.cryptoService.encrypt(signUpDto.password)
          : this.cryptoService.encrypt(defaultPassword);

        // 创建用户
        const user = await prisma.user.create({
          data: {
            email: signUpDto.email,
            nickName: signUpDto.nickName,
            password: password,
          },
        });

        // 分配角色
        const roleId = signUpDto.roleId || defaultRoleId;
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
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
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
