import { isNotNull } from '@/utils/helpers';
import {
  EntityMetadata,
  ApiMetadata,
  EntityResultWithMetadata,
  EntityWithEncodedMetadata,
} from '../types';

const API_KEY_PREFIX = '$ui_';

export function encodeMetadata<T extends EntityMetadata>(
  metadata?: T
): ApiMetadata {
  const encoded: ApiMetadata = {};

  for (const clientKey in metadata) {
    const value = metadata[clientKey];
    const apiKey = `${API_KEY_PREFIX}${clientKey}`;

    if (isNotNull(value)) {
      if (typeof value === 'boolean' || typeof value === 'object') {
        try {
          encoded[apiKey] = JSON.stringify(value);
        } catch {
          encoded[apiKey] = String(value);
        }
      } else {
        encoded[apiKey] = String(value);
      }
    }
  }

  return encoded;
}

export function decodeMetadata<T extends EntityMetadata>(
  metadata?: ApiMetadata
): T {
  const decoded: EntityMetadata = {};

  for (const apiKey in metadata) {
    const value = metadata[apiKey];
    const clientKey = apiKey.startsWith(API_KEY_PREFIX)
      ? apiKey.slice(API_KEY_PREFIX.length)
      : apiKey;

    if (isNotNull(value)) {
      try {
        const parsedValue = JSON.parse(value);

        decoded[clientKey] = isNotNull(parsedValue) ? parsedValue : value;
      } catch {
        decoded[clientKey] = value;
      }
    }
  }

  return decoded as T;
}

export function decodeEntityWithMetadata<
  T extends { uiMetadata: EntityMetadata },
>(apiEntity: EntityResultWithMetadata<T>): T {
  const { metadata, ...rest } = apiEntity;

  return {
    ...rest,
    uiMetadata: decodeMetadata<T['uiMetadata']>(metadata),
  } as T;
}

export function encodeEntityWithMetadata<
  T extends { uiMetadata: EntityMetadata },
>(entity: T): EntityWithEncodedMetadata<T> {
  const { uiMetadata, ...rest } = entity;

  return { ...rest, metadata: encodeMetadata<T['uiMetadata']>(uiMetadata) };
}
