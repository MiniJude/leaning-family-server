import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// prisma
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionModule } from './modules/permisson/permission.module';
import { CryptoModule } from './crypto/crypto.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { CspMiddleware } from '@/common/middleware/csp.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    PermissionModule,
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  // 注册中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CspMiddleware).forRoutes('*');
  }
}
