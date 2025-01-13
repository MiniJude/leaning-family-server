import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // 捕获 HttpException 类型的错误
        if (error instanceof HttpException) {
          return of({
            code: error.getStatus(),
            msg: error.message || '发生错误',
          });
        }

        // 其他类型的错误
        return throwError(
          () =>
            new HttpException(
              {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                msg: '服务器错误',
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
