import { Button } from '@/components/ui/Button';
import { ErrorPage } from '@/components/ui/ErrorPage';
import { ArrowRight } from '@carbon/icons-react';

export default function NotFoundPage() {
  return (
    <ErrorPage title="Artifact Not Found">
      {/* TODO: Should be linked to bee-ui */}
      <Button kind="secondary" size="lg" Icon={ArrowRight}>
        Create your own
      </Button>
    </ErrorPage>
  );
}
