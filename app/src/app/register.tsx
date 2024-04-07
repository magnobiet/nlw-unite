import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosError } from 'axios';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { api } from '~/api';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { useBadgeStore } from '~/store/badge.store';
import { colors } from '~/styles/colors';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const badgeStore = useBadgeStore();

  async function handleRegister() {
    try {
      if (!name.trim()) {
        return Alert.alert('Validação', 'Informe o nome completo');
      }

      if (!email.trim()) {
        return Alert.alert('Validação', 'Informe o endereço de e-mail');
      }

      setIsLoading(true);

      const response = await api.post(
        '/events/445ed340-32b2-48f0-a7d4-dd1ee50ea8d6/attendees',
        { name, email },
      );

      if (response.status === 201) {
        setIsLoading(false);

        const { data } = await api.get(
          `/attendees/${response.data.attendeeId}/badge`,
        );

        badgeStore.save(data);

        return Alert.alert('Inscrição', 'Inscrição realizada com sucesso', [
          {
            text: 'Ver credencial',
            onPress: () => router.push('/ticket'),
          },
        ]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          let errorMessage = '';

          if (error.response?.data.errors) {
            Object.keys(error.response?.data.errors).forEach((field) => {
              errorMessage += `${field}\n${error.response?.data.errors[field]}\n\n`;
            });
          }

          return Alert.alert(error.response?.data.message, errorMessage.trim());
        }

        return Alert.alert('Erro', error.response?.data.message);
      }

      return Alert.alert(
        'Erro',
        'Não foi possível fazer a inscrição. Tente novamente mais tarde.',
      );
    }
  }

  return (
    <View className="flex-1 items-center justify-center gap-12 p-4">
      <Image
        source={require('~/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
      />

      <View className="flex-col gap-4">
        <Input>
          <MaterialCommunityIcons
            name="account-circle-outline"
            color={colors.green[200]}
            size={20}
          />

          <Input.Field
            placeholder="Nome completo"
            keyboardType="default"
            onChangeText={setName}
          />
        </Input>

        <Input>
          <MaterialCommunityIcons
            name="email-outline"
            color={colors.green[200]}
            size={20}
          />

          <Input.Field
            placeholder="Endereço de e-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button onPress={handleRegister} isLoading={isLoading}>
          Realizar inscrição
        </Button>

        <Link
          href="/"
          className="text-gray-100 text-base font-bold mt-8 text-center"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
