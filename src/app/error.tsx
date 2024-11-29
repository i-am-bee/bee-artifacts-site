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
    <ErrorPage title={error.message}>
      <Button kind="secondary" size="lg" Icon={Restart} onClick={reset}>
        Try again
      </Button>
    </ErrorPage>
  );
}
