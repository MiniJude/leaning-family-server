import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// prisma
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

import { PostService } from './post.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, PostService],
})
export class AppModule {}
