// prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 使该模块全局化
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 导出 PrismaService 使其可以在其他模块中使用
})
export class PrismaModule {}
