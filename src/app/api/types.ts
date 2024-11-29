import { components } from './schema';

export type ApiErrorResponse = components['schemas']['ErrorResponse'];

export type ApiErrorCode = ApiErrorResponse['error']['code'];
