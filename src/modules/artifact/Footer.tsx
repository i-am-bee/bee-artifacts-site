import { Container } from '@/components/ui/Container';
import BeeIcon from './BeeIcon.svg';

interface Props {
  showReportButton?: boolean;
}

export function Footer({ showReportButton }: Props) {
  return (
    <footer className="sticky bottom-0 left-0 border-t border-t-subtle bg-background py-4">
      <Container>
        <div className="grid gap-x-4 gap-y-1 text-12 text-secondary md:flex md:items-center md:justify-between">
          <p>
            <span>Made with</span>{' '}
            <span className="inline-flex items-center gap-x-0.5 align-top text-dark">
              <BeeIcon className="h-3 w-3" />
              <strong>Bee</strong>
            </span>
          </p>

          {showReportButton && (
            <p className="md:text-right">
              Apps are user-generated and may contain unverified or potentially
              unsafe content.{' '}
              <button type="button" className="underline hover:no-underline">
                Report
              </button>
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
