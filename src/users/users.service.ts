import { HttpException, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import LoginUserDto from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 创建用户
   *
   * @author: lcs
   * @param createUserDto 创建用户的数据传输对象
   * @returns 注册结果，包含状态码和消息
   * @throws 如果用户已存在，抛出 HttpException 异常，状态码为 400
   * @throws 如果注册失败，抛出 HttpException 异常，状态码为 401，并附带错误信息
   */
  async create(createUserDto: CreateUserDto) {
    // 判断用户是否存在
    const res = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });
    if (res) throw new HttpException('用户已存在', 400);
    try {
      await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          // 加密
          password: this.cryptoService.encrypt(createUserDto.password),
        },
      });
      return {
        code: 200,
        msg: '注册成功',
      };
    } catch (error) {
      throw new HttpException('注册失败', 401, { cause: error });
    }
  }

  /**
   * 用户登录
   *
   * @author: lcs
   * @param loginUserDto 登录用户信息
   * @returns 登录结果，包含状态码和消息
   * @throws HttpException 当用户不存在、邮箱不存在或密码错误时抛出异常
   */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: loginUserDto.email,
      },
    });
    if (!user) throw new HttpException('用户不存在', 401);
    if (loginUserDto.email !== user.email) {
      throw new HttpException('邮箱不存在', 401);
    }
    if (!this.cryptoService.verify(loginUserDto.password, user.password)) {
      throw new HttpException('密码错误', 401);
    }
    return {
      code: 200,
      msg: '登录成功',
      data: {
        token: this.jwtService.sign({
          email: user.email,
          id: user.id,
        }),
      },
    };
  }

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

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

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

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
