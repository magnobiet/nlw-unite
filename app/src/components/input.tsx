import { ReactNode } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { colors } from '~/styles/colors';

type InputProps = {
  children: ReactNode;
};

function Input({ children }: InputProps) {
  return (
    <View className="w-full h-16 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg">
      {children}
    </View>
  );
}

type FieldProps = TextInputProps;

function Field({ ...props }: FieldProps) {
  return (
    <TextInput
      placeholderTextColor={colors.gray[200]}
      className="flex-1 text-white text-base font-regular"
      {...props}
    />
  );
}

Input.Field = Field;

export { Input };
