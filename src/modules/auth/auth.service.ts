import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

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

    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
    });
    return token;
  }
}
