import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { ReactElement } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useBadgeStore } from '~/store/badge.store';
import { colors } from '~/styles/colors';
import { QRCode } from './qrcode';

type CredentialProps = {
  onChangeAvatar?: () => void;
  onShowQRCode?: () => void;
};

export function Credential({
  onChangeAvatar,
  onShowQRCode,
}: CredentialProps): ReactElement {
  const { data } = useBadgeStore();
  const { height } = useWindowDimensions();

  return (
    <MotiView
      className="w-full self-stretch items-center"
      from={{
        opacity: 1,
        translateY: height * -1,
        rotateZ: '50deg',
        rotateY: '30deg',
        rotateX: '30deg',
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateZ: '0deg',
        rotateY: '0deg',
        rotateX: '0deg',
      }}
      transition={{
        type: 'spring',
        damping: 20,
        rotateZ: { damping: 15, mass: 3 },
      }}
    >
      <Image
        source={require('~/assets/ticket/band.png')}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require('~/assets/ticket/header.png')}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {data?.eventName}
            </Text>

            <Text className="text-zinc-50 text-sm font-bold">
              #{String(data?.id).padStart(4, '0')}
            </Text>
          </View>

          <View className="size-40 bg-black rounded-full" />
        </ImageBackground>

        <View className="items-center -mt-24">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onChangeAvatar}
            className="size-36 rounded-full mb-8 items-center justify-center bg-gray-400"
          >
            {data?.image ? (
              <Image
                source={{ uri: data.image }}
                className="size-36 rounded-full"
              />
            ) : (
              <MaterialCommunityIcons
                name="camera"
                size={32}
                color={colors.green[400]}
              />
            )}
          </TouchableOpacity>

          <View className="gap-4 items-center">
            <View className="items-center">
              <Text className="font-bold text-2xl text-zinc-50">
                {data?.name}
              </Text>

              <Text className="font-regular text-base text-zinc-300">
                {data?.email}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onShowQRCode}
              className="gap-2"
            >
              <QRCode size={128} value={data?.checkInURL!} />

              <Text className="font-body text-orange-500 text-sm text-center">
                Ampliar QRCode
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MotiView>
  );
}
