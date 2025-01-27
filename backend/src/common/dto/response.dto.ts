import { HttpStatus } from '@nestjs/common';

export class ApiResponseDto<T> {
  success: boolean;
  statusCode: HttpStatus;
  title?: string | null;
  message?: string | null;
  data?: T;
  validationErrors?: ValidationErrorDto[] | null;
  error?: any;

  constructor(
    success: boolean,
    statusCode: HttpStatus,
    title?: string | null,
    message?: string | null,
    data?: T,
    validationErrors?: ValidationErrorDto[] | null,
    error?: any,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.title = title;
    this.message = message;
    this.data = data;
    this.validationErrors = validationErrors;
    this.error = error;
  }

  static success<T>(
    statusCode: HttpStatus,
    title?: string,
    message?: string,
    data?: T | null,
  ): ApiResponseDto<T> {
    return new ApiResponseDto<T>(true, statusCode, title, message, data as T);
  }

  static error<T>(
    statusCode: HttpStatus,
    title?: string,
    message?: string,
    error?: any,
  ): ApiResponseDto<T> {
    return new ApiResponseDto<T>(
      false,
      statusCode,
      title,
      message,
      null as T,
      null,
      error,
    );
  }

  static validationError(
    validationErrors?: ValidationErrorDto[],
  ): ApiResponseDto<null> {
    return new ApiResponseDto<null>(
      false,
      HttpStatus.UNPROCESSABLE_ENTITY,
      null,
      null,
      null,
      validationErrors,
      null,
    );
  }
}

export class ValidationErrorDto {
  field: string;
  value: any;
  message: string;

  constructor(
    field: string,
    value: any,
    message: string
  ) {
    this.field = field;
    this.value = value;
    this.message = message;
  }
}
