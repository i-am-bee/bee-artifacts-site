import { PropsWithChildren } from 'react';

export function Modal({ children }: PropsWithChildren) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed left-0 top-0 z-50 grid h-full w-full overflow-y-auto bg-overlay p-4 md:p-8"
    >
      <div className="m-auto w-full min-w-0 max-w-[38rem] rounded-2 bg-background p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
