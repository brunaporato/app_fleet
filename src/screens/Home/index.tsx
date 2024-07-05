import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { CarStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { HistoryCard } from '../../components/HistoryCard';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const { navigate } = useNavigation()

  const history = useQuery(History)
  const realm = useRealm()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse._id.toString() })
    }

    navigate('departure')
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = history.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', "An error ocurred while fetching vehicle data. Try again later.")
    }
  }

  function fetchHistory() {
    history.filtered("status = 'arrival' SORT(created_at DESC)")
  }

  // Fetch vehicle in use on component mount
  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  // Listen to changes on realm database
  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => {
      realm.removeListener('change', fetchVehicleInUse)
    }
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [history])

  return (
    <Container>
      <Header />
      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <HistoryCard
          data={{ createdAt: '20/04', licensePlate: 'ABC-1234', isSync: false }}
        />
      </Content>
    </Container>
  );
}