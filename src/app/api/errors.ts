import { ApiErrorCode, ApiErrorResponse } from './types';

class CustomError extends Error {
  name!: string;

  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    // set error name as constructor name, make it not enumerable to keep native Error behavior
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
    Object.defineProperty(this, 'name', {
      value: new.target.name,
      enumerable: false,
      configurable: true,
    });

    Object.setPrototypeOf(this, new.target.prototype);

    if (typeof Error.captureStackTrace === 'function')
      Error.captureStackTrace(this, this.constructor);
  }
}

export class ApiError extends CustomError {
  response!: Response | null;
  data!: ApiErrorResponse;
  code!: ApiErrorCode;

  constructor(response: Response | null, data: ApiErrorResponse) {
    super(data.error.message);

    this.response = response;
    this.data = data;
    this.code = data.error.code;
  }
}

export class HttpError extends CustomError {
  statusCode!: number;
  response!: Response;
  body!: unknown;

  constructor(response: Response, body: unknown) {
    super(`HTTP Error: status=${response.statusText}; code=${response.status}`);

    this.response = response;
    this.statusCode = response.status;
    this.body = body;
  }
}
