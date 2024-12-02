import { useMediaQuery } from 'usehooks-ts';

export function useTheme() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return isDark ? Theme.DARK : Theme.LIGHT;
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}
