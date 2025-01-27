import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseDto, ValidationErrorDto } from '../dto/response.dto';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as any;

    const validationErrors: ValidationErrorDto[] = Array.isArray(
      exceptionResponse.message,
    )
      ? exceptionResponse.message.map((error: any) => ({
          property: error.property,
          value: error.value,
          message: Object.values(error.constraints)[0],
        }))
      : [];

    response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json(ApiResponseDto.validationError(validationErrors));
  }
}
