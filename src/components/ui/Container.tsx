import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  size?: 'full';
  className?: string;
}

export function Container({
  size,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        'container',
        { 'max-w-none': size === 'full' },
        className
      )}
    >
      {children}
    </div>
  );
}
