import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  nickName?: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
  @IsOptional()
  password?: string;
  @IsOptional()
  roleId?: number;
}
