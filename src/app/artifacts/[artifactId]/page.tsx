import { fetchArtifactShared } from '@/app/api/artifacts';
import { Main } from '@/components/layout/Main';
import { Container } from '@/components/ui/Container';
import { ArtifactSharedIframe } from '@/modules/artifacts/ArtifactSharedIframe';
import { Footer } from '@/modules/artifacts/Footer';
import { Header } from '@/modules/artifacts/Header';
import { WarningModal } from '@/modules/artifacts/WarningModal';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    artifactId: string;
  }>;
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ArtifactPage({ params, searchParams }: Props) {
  const { artifactId } = await params;
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  const artifact = await fetchArtifactShared({
    id: artifactId,
    token: token,
  });

  if (!artifact) {
    notFound();
  }

  return (
    <>
      <Header artifact={artifact} token={token} />

      <Main className="flex py-2 md:py-6">
        <Container className="px-2 md:px-6" size="full">
          <ArtifactSharedIframe artifact={artifact} token={token} />
        </Container>
      </Main>

      <Footer showReportButton />

      <WarningModal artifactId={artifactId} />
    </>
  );
}
