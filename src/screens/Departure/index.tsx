import { useRef, useState } from 'react';
import { Container, Content } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { useUser } from '@realm/react';
import { History } from '../../libs/realm/schemas/History';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '../../libs/realm';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const realm = useRealm()
  const user = useUser()
  const { goBack } = useNavigation()

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  function handleRegisterDeparture() {
    try {
      if(!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert("License plate invalid", "Please enter a valid license plate")
      }
  
      if(description.trim().length === 0) {
        descriptionRef.current?.focus()
        return Alert.alert("Description is required", "Please enter a purpose for this departure")
      }

      setIsSubmitting(true)

      realm.write(() => {
        realm.create("History", History.generate({
          user_id: user!.id,
          license_plate: licensePlate.toUpperCase(),
          description
        }))
      })

      Alert.alert("Departure registered", "Your departure has been successfully registered.")
      goBack()
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
      Alert.alert("Error", "An unexpected error has occurred. Please try again.")
    }

  }

  return (
    <Container>
      <DepartureHeader title='Departure' />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              label='License Plate'
              placeholder='BRA1234'
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
              onChangeText={setLicensePlate}
              ref={licensePlateRef}
            />
            <TextAreaInput
              label='Description'
              placeholder="I'll use this vehicle for..."
              ref={descriptionRef}
              onSubmitEditing={handleRegisterDeparture}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title='Register Departure'
              onPress={handleRegisterDeparture}
              isLoading={isSubmitting}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}