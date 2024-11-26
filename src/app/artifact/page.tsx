import { Main } from '@/components/layout/Main';
import { Container } from '@/components/ui/Container';
import { Footer } from '@/modules/artifact/Footer';
import { Header } from '@/modules/artifact/Header';
import { WarningModal } from '@/modules/artifact/WarningModal';
import { GroupPresentation } from '@carbon/icons-react';

export default function ArtifactPage() {
  return (
    <>
      <Header
        heading="College essay writer"
        Icon={GroupPresentation}
        tooltip="College essay writer"
      />

      <Main className="py-4 md:py-8">
        <Container>{/* TODO: iframe content */}</Container>
      </Main>

      <Footer showReportButton />

      <WarningModal />
    </>
  );
}
