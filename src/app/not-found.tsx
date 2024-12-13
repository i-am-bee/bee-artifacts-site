import { Button } from '@/components/ui/Button';
import { ErrorPage } from '@/components/ui/ErrorPage';
import { ArrowRight } from '@carbon/icons-react';
import { BEE_SITE_URL } from '@/utils/constants';

export default function NotFoundPage() {
  return (
    <ErrorPage title="Artifact Not Found">
      <Button kind="secondary" size="lg" Icon={ArrowRight} asChild>
        <a href={BEE_SITE_URL}>Create your own</a>
      </Button>
    </ErrorPage>
  );
}
