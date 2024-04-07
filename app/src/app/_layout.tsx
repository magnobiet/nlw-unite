import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Loading } from '~/components/loading';
import '~/styles/global.css';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  return (
    <>
      <StatusBar style="light" />

      <View className="bg-green-500 flex-1 h-screen w-screen">
        {fontsLoaded ? <Slot /> : <Loading />}
      </View>
    </>
  );
}
