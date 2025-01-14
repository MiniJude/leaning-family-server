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
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: signUpDto.email,
          // 加密
          password: this.cryptoService.encrypt(signUpDto.password),
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error,
      });
    }
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
    return this.prismaService.user.delete({
      where,
    });
  }
}
