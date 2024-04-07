import { ComponentProps, ReactElement, ReactNode } from 'react';

type TableProps = { children: ReactNode } & ComponentProps<'table'>;

export function Table({ children, ...props }: TableProps): ReactElement {
  return (
    <div className="border border-white/10 rounded-lg">
      <table {...props} className="w-full table-fixed">
        {children}
      </table>
    </div>
  );
}
