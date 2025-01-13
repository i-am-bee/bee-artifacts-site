import { Footer } from '@/modules/artifacts/Footer';
import { PropsWithChildren } from 'react';
import { Main } from '../layout/Main';
import { Container } from './Container';

export function ErrorPage({ children }: PropsWithChildren) {
  return (
    <>
      <Main className="flex h-full flex-col items-center justify-center bg-background py-4 md:py-8">
        <Container>{children}</Container>
      </Main>

      <Footer />
    </>
  );
}
