import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { CarStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';

export function Home() {
  const { navigate } = useNavigation()

  // const history = useQuery(History)

  function handleRegisterMovement() {
    navigate('departure')
  }

  // function fetchVehicle() {
  //   console.log(history)
  // }

  return (
    <Container>
      <Header />
      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}