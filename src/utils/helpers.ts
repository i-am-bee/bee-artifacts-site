export function isNotNull<T>(value: T | null | undefined): value is T {
  return value != null;
}

export function addTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

export function removeTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}
