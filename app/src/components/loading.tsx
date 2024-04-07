import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type LoadingProps = ActivityIndicatorProps;

export function Loading({ className, ...props }: LoadingProps) {
  return (
    <ActivityIndicator
      className={twMerge(
        'flex-1 bg-green-500 items-center justify-center text-orange-500',
        className,
      )}
      size="large"
      {...props}
    />
  );
}
