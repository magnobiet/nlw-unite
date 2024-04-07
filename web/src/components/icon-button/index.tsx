import { clsx } from 'clsx';
import { ComponentProps, ReactElement, ReactNode } from 'react';

type IconButtonProps = {
  children: ReactNode;
  transparent?: boolean;
} & ComponentProps<'button'>;

export function IconButton({
  children,
  transparent,
  disabled,
  ...props
}: IconButtonProps): ReactElement {
  return (
    <button
      type="button"
      {...props}
      className={clsx('border border-white/10 rounded-md p-1.5', {
        'bg-white/10': !transparent,
        'bg-black/20': transparent,
        'opacity-40': disabled,
      })}
    >
      {children}
    </button>
  );
}
