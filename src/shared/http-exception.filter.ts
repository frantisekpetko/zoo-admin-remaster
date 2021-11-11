import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const stackArr = exception.stack.split("\n");
        const stack = stackArr.map(s => {
            return s.split(' ').join('')
        });

        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.protocol + '://' + request.get('host') + request.url,
            method: request.method,
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                    ? exception || exception.message || null
                    : 'Internal server error',
            stack: stack
        };

        response.status(status).json(errorResponse);
    }
}