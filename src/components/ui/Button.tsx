import { AsChild } from '@/types/asChild';
import { CarbonIconType } from '@carbon/icons-react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const button = cva(
  'focus-base inline-flex items-center justify-between gap-x-4 rounded-2 border px-[0.9375rem] text-left text-14 transition-colors',
  {
    variants: {
      kind: {
        primary:
          'border-transparent bg-blue-60 text-white hover:bg-blueHover-60 active:bg-blue-80',
        secondary:
          'border-transparent bg-black text-white hover:bg-grayHover-80 active:bg-gray-60 dark:bg-white dark:text-black dark:hover:bg-coolGray-20 dark:active:bg-coolGray-30',
        tertiary:
          'border-coolGray-30 bg-transparent text-dark hover:border-black hover:bg-black hover:text-white active:border-gray-60 active:bg-gray-60 dark:border-coolGray-70 dark:hover:border-white dark:hover:bg-white dark:hover:text-light dark:active:border-coolGray-30 dark:active:bg-coolGray-30',
        ghost: 'border-transparent hover:bg-gray-50/[.12] active:bg-gray-50/50',
      },
      size: {
        sm: 'min-h-8 py-1.5',
        md: 'min-h-10 py-2.5 md:gap-x-8',
        lg: 'min-h-12 py-3 md:gap-x-8',
      },
    },
    defaultVariants: {
      kind: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    VariantProps<typeof button>,
    AsChild {
  Icon?: CarbonIconType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ kind, size, Icon, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        type="button"
        {...props}
        className={button({ kind, size })}
        ref={ref}
      >
        <Slottable>{children}</Slottable>

        {Icon && <Icon className="shrink-0" />}
      </Comp>
    );
  }
);
Button.displayName = 'Button';
