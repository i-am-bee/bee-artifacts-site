import {
  CheckboxCheckedFilled,
  Checkbox as CheckboxIcon,
} from '@carbon/icons-react';
import { InputHTMLAttributes } from 'react';

export function Checkbox({
  children,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>) {
  return (
    <label className="inline-flex cursor-pointer gap-x-2 align-top text-14">
      <input {...props} type="checkbox" className="peer sr-only" />

      <span className="peer-focus-base grid rounded-1 peer-focus-visible:ring-offset-0 peer-checked:[&>svg.invisible]:visible peer-checked:[&>svg.invisible]:opacity-100">
        <CheckboxIcon size={20} className="col-span-full row-span-full" />

        <CheckboxCheckedFilled
          size={20}
          className="invisible col-span-full row-span-full opacity-0 transition"
        />
      </span>

      <span className="min-h-5 py-px">{children}</span>
    </label>
  );
}
