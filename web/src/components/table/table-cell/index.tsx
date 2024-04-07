import { ComponentProps, ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableCellProps = { children?: ReactNode } & ComponentProps<'td'>;

export function TableCell({
  children,
  className,
  ...props
}: TableCellProps): ReactElement {
  return (
    <td
      {...props}
      className={twMerge('py-3 px-4 text-sm text-zinc-300', className)}
    >
      {children}
    </td>
  );
}
