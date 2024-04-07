import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosError } from 'axios';
import { Link, Redirect } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { api } from '~/api';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Badge, useBadgeStore } from '~/store/badge.store';
import { colors } from '~/styles/colors';

export default function HomeScreen() {
  const [credential, setCredential] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    try {
      if (!credential.trim()) {
        return Alert.alert('Credencial', 'Informa uma credencial válida');
      }

      setIsLoading(true);

      const { data } = await api.get<Badge>(`/attendees/${credential}/badge`);

      badgeStore.save(data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);

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
        'Não foi obter a credencial. Tente novamente mais tarde.',
      );
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-12  p-4">
      <Image
        source={require('~/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
      />

      <View className="flex-col gap-4">
        <Input>
          <MaterialCommunityIcons
            name="ticket-outline"
            color={colors.green[200]}
            size={20}
          />

          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCredential}
          />
        </Input>

        <Button onPress={handleAccessCredential} isLoading={isLoading}>
          Acessar credencial
        </Button>

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold mt-8 text-center"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}
