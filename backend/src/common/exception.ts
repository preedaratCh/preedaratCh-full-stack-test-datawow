import { HttpStatus } from '@nestjs/common';
import { ValidationErrorDto } from './dto/response.dto';

export class ApiException extends Error {
  public readonly success: boolean = false;
  public readonly statusCode: number;
  public readonly title?: string | null;
  private _message?: string | null | undefined;
  public readonly validationErrors?: ValidationErrorDto[] | null;
  public readonly error?: any;

  get message(): string {
    return this._message ?? '';
  }

  set message(value: string | null) {
    this._message = value;
  }

  constructor(
    statusCode: number,
    title?: string | null,
    _message: string | null | undefined = undefined,
    validationErrors?: ValidationErrorDto[] | null,
    error?: any | null,
  ) {
    super(_message ?? undefined);
    this.statusCode = statusCode;
    this.title = title;
    this._message = _message;
    this.validationErrors = validationErrors;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }

  static error(
    statusCode: number,
    title: string,
    message: string | null,
    error: any,
  ): ApiException {
    return new ApiException(statusCode, title, message, null, error);
  }

  toJSON() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      title: this.title,
      validationErrors: this.validationErrors,
      error: this.error,
      message: this.message,
    };
  }
}