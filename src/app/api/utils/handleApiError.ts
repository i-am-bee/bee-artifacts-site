import { isNotNull } from '@/utils/helpers';
import { notFound } from 'next/navigation';
import { ApiError } from '../errors';
import { ApiErrorResponse } from '../types';
import { createApiErrorResponse } from './createApiErrorResponse';

type ErrorCode = string | null | undefined;

export function checkErrorCode(error: Error): ErrorCode {
  const { cause } = error;

  if (typeof cause === 'object' && isNotNull(cause) && 'code' in cause) {
    return cause.code as ErrorCode;
  }

  return null;
}

export function handleApiError(error: unknown): void | ApiErrorResponse {
  if (error instanceof ApiError) {
    if (error.code === 'not_found') {
      notFound();
    }

    return createApiErrorResponse(
      'internal_server_error',
      'Unknown server error.'
    );
  } else {
    if (error instanceof Error) {
      const errorCode = checkErrorCode(error);

      if (errorCode === 'ECONNREFUSED' || errorCode === 'ENOTFOUND') {
        return createApiErrorResponse(
          'service_unavailable',
          'The API server is probably unavailable.'
        );
      }
    }

    return createApiErrorResponse(
      'internal_server_error',
      'Unknown server error.'
    );
  }
}
