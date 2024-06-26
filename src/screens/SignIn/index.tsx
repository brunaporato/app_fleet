import { Container, Slogan, Title } from './styles';

import BgImage from '../../assets/background.png'
import { Button } from '../../components/Button';

export function SignIn() {
  return (
    <Container source={BgImage}>
      <Title>
        App Fleet
      </Title>
      <Slogan>
        Track your company's vehicles in real-time
      </Slogan>
      <Button title='Sign in with Google' />
    </Container>
  );
}