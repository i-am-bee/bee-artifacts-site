import { ArtifactShared } from '@/app/api/artifacts/types';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Tooltip } from '@/components/ui/Tooltip';
import { DirectionFork, Information } from '@carbon/icons-react';
import { ArtifactIcon } from './ArtifactIcon';
import { BEE_SITE_URL } from '@/utils/constants';

interface Props {
  artifact: ArtifactShared;
  token: string;
}

export function Header({ artifact, token }: Props) {
  return (
    <header className="sticky left-0 top-0 border-b border-b-subtle bg-background py-3 md:py-5">
      <Container>
        <div className="grid items-center justify-center gap-x-4 gap-y-2 md:grid-cols-[1fr,auto,1fr]">
          <div className="flex items-center gap-x-1 md:col-start-2">
            {artifact.uiMetadata.icon && (
              <ArtifactIcon name={artifact.uiMetadata.icon} />
            )}

            <h1 className="text-base font-semibold text-coolGray-100 dark:text-white">
              {artifact.name}
            </h1>

            {artifact.description && (
              <Tooltip content={artifact.description}>
                <Information />
              </Tooltip>
            )}
          </div>

          <div className="justify-self-center whitespace-nowrap md:col-start-3 md:justify-self-end">
            <Button kind="secondary" size="sm" Icon={DirectionFork} asChild>
              <a
                href={`${BEE_SITE_URL}clone-app/${artifact.id}?token=${token}`}
              >
                Copy to edit
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
