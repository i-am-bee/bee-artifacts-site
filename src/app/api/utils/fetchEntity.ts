import { ApiError } from '../errors';
import { handleApiError } from './handleApiError';

export async function fetchEntity<T>(
  fetchFn: () => Promise<T>
): Promise<T | undefined> {
  try {
    return await fetchFn();
  } catch (error) {
    const apiError = handleApiError(error);

    if (apiError) {
      throw new ApiError(null, apiError);
    }

    return undefined;
  }
}
