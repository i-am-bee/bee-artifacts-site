import { ArtifactSharedIcon } from '@/app/api/artifacts/types';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Tooltip } from '@/components/ui/Tooltip';
import { DirectionFork, Information } from '@carbon/icons-react';
import { ArtifactIcon } from './ArtifactIcon';

interface Props {
  heading: string;
  icon?: ArtifactSharedIcon;
  tooltip?: string | null;
}

export function Header({ heading, icon, tooltip }: Props) {
  return (
    <header className="sticky left-0 top-0 border-b border-b-subtle bg-background py-3 md:py-5">
      <Container>
        <div className="grid items-center justify-center gap-x-4 gap-y-2 md:grid-cols-[1fr,auto,1fr]">
          <div className="flex items-center gap-x-1 md:col-start-2">
            {icon && <ArtifactIcon name={icon} />}

            <h1 className="text-base font-semibold text-coolGray-100 dark:text-white">
              {heading}
            </h1>

            {tooltip && (
              <Tooltip content={tooltip}>
                <Information />
              </Tooltip>
            )}
          </div>

          {/* TODO: Should link to bee-ui */}
          <div className="justify-self-center whitespace-nowrap md:col-start-3 md:justify-self-end">
            <Button kind="secondary" size="sm" Icon={DirectionFork}>
              Copy to edit
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
