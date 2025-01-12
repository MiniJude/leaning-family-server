import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    try {
      const res = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // 存储用户信息到请求对象中，以便后续使用
      request.user = res;
    } catch (error) {
      // 抛出异常，表示认证失败
      throw new UnauthorizedException('token失效，请重新登录', error);
    }
    return true;
  }
}
