import { fetchArtifactShared } from '@/app/api/artifacts';
import { Main } from '@/components/layout/Main';
import { Container } from '@/components/ui/Container';
import { ArtifactSharedIframe } from '@/modules/artifacts/ArtifactSharedIframe';
import { Footer } from '@/modules/artifacts/Footer';
import { Header } from '@/modules/artifacts/Header';
import { WarningModal } from '@/modules/artifacts/WarningModal';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    artifactId: string;
  };
  searchParams: {
    secret?: string;
  };
}

export default async function ArtifactPage({ params, searchParams }: Props) {
  const { artifactId } = await params;
  const { secret } = await searchParams;

  if (!secret) {
    notFound();
  }

  const artifact = await fetchArtifactShared({
    id: artifactId,
    secret,
  });

  if (!artifact) {
    notFound();
  }

  return (
    <>
      <Header heading={artifact.name} tooltip={artifact.description} />

      <Main className="flex py-4 md:py-8">
        <Container>
          <ArtifactSharedIframe artifact={artifact} />
        </Container>
      </Main>

      <Footer showReportButton />

      <WarningModal artifactId={artifactId} />
    </>
  );
}
