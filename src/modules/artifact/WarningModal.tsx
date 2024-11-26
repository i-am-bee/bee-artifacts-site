import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Modal } from '@/components/ui/Modal';
import { ArrowRight } from '@carbon/icons-react';
import Icon from './WarningModalIcon.svg';

export function WarningModal() {
  return (
    <Modal>
      <div className="mb-4 flex aspect-[544/256] items-center justify-center rounded-2 bg-magenta-20 p-5">
        <div className="w-full max-w-[4.125rem] md:max-w-[8.25rem]">
          <Icon />
        </div>
      </div>

      <h2 className="mb-2">User-generated app</h2>

      <div className="flex flex-col gap-y-4 md:gap-y-6">
        <p>
          You are viewing a user-generated app. Apps are reusable widgets that
          can be used to streamline simple, everyday tasks.
        </p>

        <p>
          This app was made and published using Bee, a next generation AI
          productivity solution. Use discretion when engaging with apps, as they
          may contain unsafe or potentially unsafe content.
        </p>

        <p>
          You can also copy and edit this app using your own Bee account to
          personalize it to your needs.
        </p>
      </div>

      <div className="mt-4 flex md:mt-6">
        <Checkbox>Don&apos;t show this message again</Checkbox>
      </div>

      <div className="mt-8 flex items-center justify-end gap-x-4 md:mt-12">
        <Button kind="ghost">Honey, no thanks</Button>

        <div className="grid md:min-w-[11rem]">
          <Button kind="secondary" Icon={ArrowRight}>
            View app
          </Button>
        </div>
      </div>
    </Modal>
  );
}
