import { useRoute } from '@react-navigation/native';
import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { X } from 'phosphor-react-native';

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  return (
    <Container>
      <DepartureHeader title='Arrival' />
      <Content>
        <Label>License Plate</Label>
        <LicensePlate>
          XXX0000
        </LicensePlate>

        <Label>Description</Label>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, voluptas? Itaque, soluta! Aspernatur, corporis debitis odio ducimus magnam vel quis fuga velit molestias et similique error id exercitationem sunt eaque.
        </Description>

        <Footer>
          <ButtonIcon icon={X} />
          <Button title='Register Arrival' />
        </Footer>

      </Content>
    </Container>
  );
}