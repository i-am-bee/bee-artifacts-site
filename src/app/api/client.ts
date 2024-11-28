import { API_URL } from '@/utils/constants';
import { addTrailingSlash } from '@/utils/helpers';
import fetchRetry from 'fetch-retry';
import { StatusCodes } from 'http-status-codes';
import createClient from 'openapi-fetch';
import { paths } from './schema';

const apiUrl = addTrailingSlash(API_URL ?? '/api/');

export const client = createApiClient<paths>(apiUrl);

function createApiClient<T extends Record<string, any>>(
  baseUrl: string,
  path?: string
) {
  return createClient<T>({
    baseUrl: `${baseUrl}${path ?? ''}`,
    fetch: fetchRetry(fetch, {
      retryOn: [
        StatusCodes.TOO_MANY_REQUESTS,
        StatusCodes.BAD_GATEWAY,
        StatusCodes.SERVICE_UNAVAILABLE,
        StatusCodes.CONFLICT,
        StatusCodes.GATEWAY_TIMEOUT,
        StatusCodes.REQUEST_TIMEOUT,
        StatusCodes.INTERNAL_SERVER_ERROR,
      ],
      retryDelay: function (attempt) {
        return Math.pow(2, attempt) * 1000;
      },
    }),
  });
}
