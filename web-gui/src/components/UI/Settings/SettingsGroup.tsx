import clsx from 'clsx';
import { ReactNode } from 'react';

export interface SettingsGroupProps {
  isDisabled?: boolean;
  groupName?: string;
  children?: ReactNode;
}

export function SettingsGroup({
  isDisabled,
  groupName,
  children,
}: SettingsGroupProps) {
  return (
    <section
      className={clsx(
        'transition-opacity',
        isDisabled && 'pointer-events-none select-none opacity-50'
      )}
    >
      {groupName && (
        <p className="mb-2 px-4 text-sm font-semibold">{groupName}</p>
      )}
      <div className="grid grid-cols-1 divide-y overflow-hidden rounded-3xl">
        {children}
      </div>
    </section>
  );
}
