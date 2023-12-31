import clsx from 'clsx';
import { HTMLAttributes, ReactHTML, ReactNode, createElement } from 'react';

export interface SettingsOption extends HTMLAttributes<HTMLElement> {
  as?: keyof ReactHTML;
  children?: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const variants = {
  default: 'bg-gray-100',
  active: 'bg-primary-100 text-primary-500',
};

export function SettingsOption({
  as = 'button',
  children,
  isActive = false,
  isDisabled = false,
  className,
  ...props
}: SettingsOption) {
  return createElement(
    as,
    {
      className: clsx(
        'flex w-full items-center bg-gray-100 p-4 text-left font-bold transition-colors md:pl-8 md:pr-5',
        isActive && variants.active,
        isDisabled && 'pointer-events-none select-none opacity-50',
        className
      ),
      ...props,
    },
    children
  );
}
