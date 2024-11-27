import { Footer } from '@/modules/artifacts/Footer';
import { PropsWithChildren } from 'react';
import { Main } from '../layout/Main';
import { Container } from './Container';

interface Props {
  title: string;
}

export function ErrorPage({ title, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Main className="flex h-full flex-col items-center justify-center py-4 text-center md:py-8">
        <Container>
          <div className="flex flex-col items-center gap-y-6">
            <h1>{title}</h1>

            {children}
          </div>
        </Container>
      </Main>

      <Footer />
    </>
  );
}
