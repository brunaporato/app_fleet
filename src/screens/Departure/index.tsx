import { useRef, useState } from 'react';
import { Container, Content } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { licensePlateValidate } from '../../utils/licensePlateValidate';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  function handleRegisterDeparture() {
    if(!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus()
      return Alert.alert("License plate invalid", "Please enter a valid license plate")
    }

    if(description.trim().length === 0) {
      descriptionRef.current?.focus()
      return Alert.alert("Description is required", "Please enter a purpose for this departure")
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
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}