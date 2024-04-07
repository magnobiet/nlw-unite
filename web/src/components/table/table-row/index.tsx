import { clsx } from 'clsx';
import { ComponentProps, ReactElement, ReactNode } from 'react';

type TableRowProps = {
  children?: ReactNode;
  isFooter?: boolean;
} & ComponentProps<'tr'>;

export function TableRow({
  children,
  className,
  isFooter,
  ...props
}: TableRowProps): ReactElement {
  return (
    <tr
      {...props}
      className={clsx(className, {
        'border-b border-white/10 hover:bg-white/5': !isFooter,
      })}
    >
      {children}
    </tr>
  );
}
