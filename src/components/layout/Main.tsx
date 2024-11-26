import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export function Main({ className, children }: PropsWithChildren<Props>) {
  return <main className={clsx('grow', className)}>{children}</main>;
}
