import { ApiErrorCode, ApiErrorResponse } from '../types';

export function createApiErrorResponse(
  code: ApiErrorCode,
  message?: string
): ApiErrorResponse {
  return {
    error: {
      code,
      message: message ?? 'Error',
    },
  };
}
