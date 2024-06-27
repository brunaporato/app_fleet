import { Container, Slogan, Title } from './styles';
import BgImage from '../../assets/background.png'
import { Button } from '../../components/Button';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { useState } from 'react';
import { Alert } from 'react-native';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()
      
      if(idToken) {

      } else {
        Alert.alert('Error', 'An error occurred while trying to sign in with Google')
        setIsAuthenticating(false)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'An error occurred while trying to sign in with Google')
      setIsAuthenticating(false)
    }
  }

  return (
    <Container source={BgImage}>
      <Title>
        App Fleet
      </Title>
      <Slogan>
        Track your company's vehicles in real-time
      </Slogan>
      <Button title='Sign in with Google' isLoading={isAuthenticating} onPress={handleGoogleSignIn} />
    </Container>
  );
}