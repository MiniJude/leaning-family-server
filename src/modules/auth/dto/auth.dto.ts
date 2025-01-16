import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsOptional()
  nickName?: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export class SignInDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
