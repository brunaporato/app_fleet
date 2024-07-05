import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { CarStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const { navigate } = useNavigation()

  const history = useQuery(History)

  function handleRegisterMovement() {
    navigate('departure')
  }

  function fetchVehicle() {
    try {
      const vehicle = history.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', "An error ocurred while fetching vehicle data. Try again later.")
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [])

  return (
    <Container>
      <Header />
      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}