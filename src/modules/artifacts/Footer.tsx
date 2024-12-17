import { Container } from '@/components/ui/Container';
import BeeAI from './BeeAI.svg';

interface Props {
  showReportButton?: boolean;
}

export function Footer({ showReportButton }: Props) {
  return (
    <footer className="sticky bottom-0 left-0 z-10 border-t border-t-subtle bg-background py-4">
      <Container>
        <div className="grid gap-x-4 gap-y-1 text-12 text-secondary md:flex md:items-center md:justify-between">
          <p className="flex items-baseline gap-x-1.5">
            <span>Made with</span>
            <span className="inline-flex shrink-0 text-dark">
              <BeeAI />
            </span>
          </p>

          {showReportButton && (
            <p className="md:text-right">
              Apps are user-generated and may contain unverified or potentially
              unsafe content.{' '}
              <a
                href="mailto:bee1@ibm.com"
                className="underline hover:no-underline"
              >
                Report
              </a>
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
