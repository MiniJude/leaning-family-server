import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// prisma
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { PostService } from './post.service';
import { UsersModule } from './users/users.module';
import { CryptoModule } from './crypto/crypto.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
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
export class AppModule {}
