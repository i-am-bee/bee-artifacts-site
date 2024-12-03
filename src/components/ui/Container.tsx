import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export function Container({ className, children }: PropsWithChildren<Props>) {
  return <div className={clsx('container', className)}>{children}</div>;
}
