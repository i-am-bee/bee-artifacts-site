import { Main } from '@/components/layout/Main';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Footer } from '@/modules/artifact/Footer';
import { ArrowRight } from '@carbon/icons-react';

export default function NotFoundPage() {
  return (
    <>
      <Main className="flex h-full flex-col items-center justify-center py-4 text-center md:py-8">
        <Container>
          <div className="flex flex-col items-center gap-y-6">
            <h1>Artifact Not Found</h1>

            <Button kind="secondary" size="lg" Icon={ArrowRight}>
              Create your own
            </Button>
          </div>
        </Container>
      </Main>

      <Footer />
    </>
  );
}
