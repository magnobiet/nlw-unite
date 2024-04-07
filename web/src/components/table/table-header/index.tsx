import { ComponentProps, ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableHeaderProps = { children?: ReactNode } & ComponentProps<'th'>;

export function TableHeader({
  children,
  className,
  ...props
}: TableHeaderProps): ReactElement {
  return (
    <th
      {...props}
      className={twMerge(
        'py-3 px-4 text-sm font-semibold text-left',
        className,
      )}
    >
      {children}
    </th>
  );
}
