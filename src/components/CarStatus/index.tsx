import { Car, Key } from 'phosphor-react-native';
import { Container, IconBox, Message, TextHighlight } from './styles';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  licensePlate?: string
}

export function CarStatus({ licensePlate, ...rest }: Props) {
  const theme = useTheme()
  
  const Icon = licensePlate ? Car : Key
  const message = licensePlate ? `Vehicle ${licensePlate} currently in use. ` : 'No vehicle is currently in use. '
  const status = licensePlate ? 'arrival' : 'departure'

  return (
    <Container activeOpacity={0.7} {...rest}>
      <IconBox>
        <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
      </IconBox>
      <Message>
        {message}

        <TextHighlight>
          Press here to register your {status}.
        </TextHighlight>
      </Message>
    </Container>
  );
}