import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);

    return {
      code: HttpStatus.CREATED,
      msg: '注册成功',
    };
  }

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(signInDto);
    return {
      code: HttpStatus.OK,
      msg: '登录成功',
      data: {
        token,
      },
    };
  }
}
