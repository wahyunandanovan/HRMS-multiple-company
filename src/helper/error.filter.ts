import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import * as fs from 'fs';

export const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? exception['response']['message']
    : String(exception);
};
@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const statusCode = getStatusCode<T>(exception);
    const message = getErrorMessage<T>(exception);

    if (request && request['file'] && fs.existsSync(request['file'].path)) {
      fs.unlinkSync(request['file'].path);
    }

    response.status(statusCode).json({
      error: {
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode,
        message,
      },
    });
  }
}
