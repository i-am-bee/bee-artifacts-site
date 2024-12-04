import { components } from './schema';

export type ApiErrorResponse = components['schemas']['ErrorResponse'];

export type ApiErrorCode = ApiErrorResponse['error']['code'];

export type EntityMetadata = {
  [key: string]: any;
};

export type ApiMetadata = {
  [key: string]: string;
};

export type EntityResultWithMetadata<T> = Omit<T, 'uiMetadata'> & {
  metadata?: ApiMetadata;
};

export type EntityWithEncodedMetadata<T> = Omit<T, 'uiMetadata'> & {
  metadata: ApiMetadata;
};

export type EntityWithDecodedMetadata<T, M> = Omit<T, 'metadata'> & {
  uiMetadata: M;
};
