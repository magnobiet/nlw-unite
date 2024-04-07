import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Redirect } from 'expo-router';
import { MotiView } from 'moti';
import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '~/components/button';
import { Credential } from '~/components/credential';
import { Header } from '~/components/header';
import { QRCode } from '~/components/qrcode';
import { useBadgeStore } from '~/store/badge.store';
import { colors } from '~/styles/colors';

export default function TicketScreen() {
  const [qrCodeExpanded, setQrCodeExpanded] = useState(false);
  const badgeStore = useBadgeStore();

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch (error) {
      console.error(error);

      Alert.alert('Compartilhar', 'Não foi possivel compartilhar');
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);

      Alert.alert('Foto', 'Não foi possível selecionar a imagem');
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 gap-12">
      <Header>Minha credencial</Header>

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          onChangeAvatar={handleSelectImage}
          onShowQRCode={() => setQrCodeExpanded(true)}
        />

        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: 10 }}
          transition={{ loop: true, type: 'timing', duration: 700 }}
        >
          <MaterialCommunityIcons
            name="chevron-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <View className="gap-4 mb-6 items-center">
          <Text className="text-white font-bold text-2xl">
            Compartilhar credencial
          </Text>

          <Text className="text-white font-regular text-base">
            Mostre ao mundo que você vai participar do Unite Summit!
          </Text>
        </View>

        <View className="p-4">
          <Button onPress={handleShare}>Compartilhar</Button>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => badgeStore.remove()}
          >
            <Text className="text-gray-100 text-base font-bold mt-8 text-center">
              Remover Ingresso
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={qrCodeExpanded} animationType="fade" statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center gap-10">
          <QRCode value={badgeStore.data.checkInURL} size={320} />

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setQrCodeExpanded(false)}
          >
            <Text className="font-body text-orange-500 text-sm text-center">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
