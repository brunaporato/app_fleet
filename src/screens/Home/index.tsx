import { Container, Content, Label, Title } from './styles';
import { Header } from '../../components/Header';
import { CarStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { HistoryCard, HistoryCardProps } from '../../components/HistoryCard';
import dayjs from 'dayjs';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const [vehicleHistory, setVehicleHistory] = useState<HistoryCardProps[]>([])
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
   try {
    const response = history.filtered("status = 'arrival' SORT(created_at DESC)")

    const formattedHistory = response.map((item) => {
      return ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        createdAt: dayjs(item.created_at).format('[Departure at] DD/MM/YYYY [at] HH:mm'),
        isSync: false,
      })
    })

    setVehicleHistory(formattedHistory)
   } catch (error) {
    console.log(error)
    Alert.alert('History Error', "An error ocurred while fetching history data.")
   }
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

        <Title>
          History
        </Title>

        <FlatList
          data={vehicleHistory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>
              No history found.
            </Label>
          )}
        />
      </Content>
    </Container>
  );
}