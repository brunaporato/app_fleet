import { TouchableOpacityProps } from 'react-native';
import { Container, Departure, Info, LicensePlate } from './styles';
import { Check, ClockClockwise } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';

export type HistoryCardProps = {
  licensePlate: string
  createdAt: string
  isSync: boolean
  id: string
}

type Props = TouchableOpacityProps & {
  data: HistoryCardProps
}

export function HistoryCard({ data, ...rest}: Props) {
  const { COLORS } = useTheme()
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>
          {data.licensePlate}
        </LicensePlate>
        <Departure>
          {data.createdAt}
        </Departure>
      </Info>

      {
        data.isSync ?
        <Check
          size={24}
          color={COLORS.BRAND_LIGHT}
        />
        :
        <ClockClockwise
          size={24}
          color={COLORS.GRAY_200}
        />
      }
    </Container>
  );
}