import { ThemeProvider } from 'styled-components';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import theme from './src/theme';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { AppProvider, RealmProvider, UserProvider } from '@realm/react';
import { REALM_APP_ID } from '@env';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold})

  if (!fontsLoaded) {
    return <Loading />;
  }
  
  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}