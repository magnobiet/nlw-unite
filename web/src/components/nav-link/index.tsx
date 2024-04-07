import { clsx } from 'clsx';
import { ComponentProps, ReactElement, ReactNode } from 'react';

type NavLinkProps = {
  children: ReactNode;
  active?: boolean;
} & ComponentProps<'a'>;

export function NavLink({
  children,
  active,
  ...props
}: NavLinkProps): ReactElement {
  return (
    <a
      {...props}
      className={clsx('font-medium text-sm ', { 'text-zinc-300': active })}
    >
      {children}
    </a>
  );
}
