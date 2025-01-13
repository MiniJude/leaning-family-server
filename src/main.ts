import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorHandlingInterceptor } from './common/interceptors/error-handling.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局管道，用于验证请求参数和响应数据
  app.useGlobalPipes(new ValidationPipe());

  // 注册全局拦截器
  app.useGlobalInterceptors(new ErrorHandlingInterceptor());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
