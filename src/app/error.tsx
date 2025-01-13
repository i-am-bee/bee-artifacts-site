'use client';

import { Button } from '@/components/ui/Button';
import { ErrorPage } from '@/components/ui/ErrorPage';
import { Restart } from '@carbon/icons-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorPage>
      <div className="flex flex-col items-center gap-y-6 text-center">
        <h1>{error.message}</h1>

        <Button kind="secondary" size="lg" Icon={Restart} onClick={reset}>
          Try again
        </Button>
      </div>
    </ErrorPage>
  );
}
