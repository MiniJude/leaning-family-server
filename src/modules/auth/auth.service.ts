import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { UsersService } from '../users/users.service';
import { generateCompleteNickname } from '@/utils/nickname-generator';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 注册
   * @param signUpDto
   * @returns void
   */
  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.findOne({ email: signUpDto.email });

    if (user) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    // 判断是否有填写昵称，如果没有则设置随机昵称
    if (!signUpDto.nickName) {
      signUpDto.nickName = generateCompleteNickname();
    }

    await this.usersService.create(signUpDto);
  }

  /**
   * 登录
   * @param signInDto
   * @returns string (Token)
   */
  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne({ email: signInDto.email });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }

    if (!this.cryptoService.verify(signInDto.password, user.password)) {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }

    // 生成 JWT Token
    const accessToken = this.jwtService.sign({
      email: user.email,
      id: user.id,
    });

    // 获取用户的菜单
    const permissions = await this.usersService.getUserMenus(user.id);

    return {
      accessToken,
      refreshToken: 'refreshToken',
      user: {
        ...user,
        permissions,
      },
    };
  }
}
