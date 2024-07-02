import { useRef } from 'react';
import { Container, Content } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleRegisterDeparture() {
    console.log('Departure registered')
  }

  return (
    <Container>
      <DepartureHeader title='Departure' />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              label='License Plate'
              placeholder='BRA-1234'
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
            />
            <TextAreaInput
              label='Purpose'
              placeholder="I'll use this vehicle for..."
              ref={descriptionRef}
              onSubmitEditing={handleRegisterDeparture}
              returnKeyType='send'
              blurOnSubmit
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