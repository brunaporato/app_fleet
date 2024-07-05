import { useRoute } from '@react-navigation/native';
import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { X } from 'phosphor-react-native';
import { useObject } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';
import { BSON } from 'realm';

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const history = useObject(History, new BSON.UUID(id) as unknown as string)

  return (
    <Container>
      <DepartureHeader title='Arrival' />
      <Content>
        <Label>License Plate</Label>
        <LicensePlate>
          {history?.license_plate}
        </LicensePlate>

        <Label>Description</Label>
        <Description>
          {history?.description}
        </Description>

        <Footer>
          <ButtonIcon icon={X} />
          <Button title='Register Arrival' />
        </Footer>

      </Content>
    </Container>
  );
}