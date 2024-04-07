import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Loading } from './loading';

type ButtonProps = {
  children: string;
  isLoading?: boolean;
} & TouchableOpacityProps;

export function Button({
  children,
  className,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        'w-full flex-row h-14 bg-orange-500 items-center justify-center rounded-lg',
        className,
      )}
      disabled={isLoading}
      activeOpacity={0.85}
      {...props}
    >
      {isLoading ? (
        <Loading size="small" className="bg-transparent text-green-500" />
      ) : (
        <Text className="text-center w-full text-green-500 text-base font-bold uppercase px-4">
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
