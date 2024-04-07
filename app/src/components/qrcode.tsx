import { ReactElement } from 'react';
import QRCodeSVG from 'react-native-qrcode-svg';
import { colors } from '~/styles/colors';

type QRCodeProps = {
  value: string;
  size: number;
};

export function QRCode({ ...props }: QRCodeProps): ReactElement {
  return (
    <QRCodeSVG color={colors.white} backgroundColor="transparent" {...props} />
  );
}
