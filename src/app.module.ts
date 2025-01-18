import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// prisma
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { PostService } from './modules/post/post.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer } from '@nestjs/common';
import { CspMiddleware } from '@/common/middleware/csp.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    CryptoModule,
    // 动态全局注册JwtModule模块
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, PostService],
})
export class AppModule {
  // 注册中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CspMiddleware).forRoutes('*');
  }
}
