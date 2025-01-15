import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = exception.message;

    // 如果是 class-validator 抛出的 BadRequestException
    if (exception.response && Array.isArray(exception.response.message)) {
      message = exception.response.message[0]; // 只取第一个错误消息
    }

    // 统一格式化返回
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
