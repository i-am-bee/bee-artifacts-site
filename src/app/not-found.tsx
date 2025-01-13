import { Button } from '@/components/ui/Button';
import { ErrorPage } from '@/components/ui/ErrorPage';
import { BEE_SITE_URL } from '@/utils/constants';
import { ArrowRight } from '@carbon/icons-react';
import AppNotFound from './app-not-found.svg';

export default function NotFoundPage() {
  return (
    <ErrorPage>
      <div className="mx-auto max-w-[38rem]">
        <div className="flex flex-col gap-y-2">
          <AppNotFound className="max-w-full" />

          <h1>Oooh, buzzkill.</h1>

          <p className="text-20">
            We couldn’t find the app you were looking for.
          </p>
        </div>

        <div className="mt-6">
          <Button kind="secondary" size="lg" Icon={ArrowRight} asChild>
            <a href={BEE_SITE_URL}>Create your own</a>
          </Button>
        </div>
      </div>
    </ErrorPage>
  );
}
