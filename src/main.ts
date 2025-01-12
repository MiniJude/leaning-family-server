import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道，用于验证请求参数和响应数据
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
