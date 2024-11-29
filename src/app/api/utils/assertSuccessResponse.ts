import { FetchResponse } from 'openapi-fetch';
import { MediaType } from 'openapi-typescript-helpers';
import { ApiError, HttpError } from '../errors';
import { ApiErrorResponse } from '../types';

type SucessFetchResponse<
  T extends Record<string | number, any>,
  O,
  M extends MediaType,
> = Extract<FetchResponse<T, O, M>, { error?: never }>;

function handleFailedResponse(response: Response, body: unknown): never {
  if (typeof body === 'object') {
    const data = body as unknown as ApiErrorResponse;

    throw new ApiError(response, data);
  }

  throw new Error('Invalid response from server', {
    cause: new HttpError(response, body),
  });
}

export function assertSuccessResponse<
  T extends Record<string | number, any>,
  O,
  M extends MediaType,
>(res: FetchResponse<T, O, M>): asserts res is SucessFetchResponse<T, O, M> {
  if (res.error != null) {
    handleFailedResponse(res.response, res.error);
  }
}
