import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Tooltip } from '@/components/ui/Tooltip';
import {
  CarbonIconType,
  DirectionFork,
  Information,
} from '@carbon/icons-react';

interface Props {
  heading: string;
  Icon?: CarbonIconType;
  tooltip?: string | null;
}

export function Header({ heading, Icon, tooltip }: Props) {
  return (
    <header className="sticky left-0 top-0 border-b border-b-subtle bg-background py-3 md:py-5">
      <Container>
        <div className="grid items-center justify-center gap-x-4 gap-y-2 md:grid-cols-[1fr,auto,1fr]">
          <div className="flex items-center gap-x-1 md:col-start-2">
            {Icon && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2 bg-coolGray-10 dark:bg-coolGray-80">
                <Icon size={16} />
              </div>
            )}

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
