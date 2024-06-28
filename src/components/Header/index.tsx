import { TouchableOpacity } from 'react-native';
import { Container, Greeting, Message, Name, Picture } from './styles';
import { Power } from 'phosphor-react-native';
import theme from '../../theme';
import { useApp, useUser } from '@realm/react';

export function Header() {
  const user = useUser()
  const app = useApp()

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <Container>
      <Picture
        source={{uri: user.profile.pictureUrl }}
        placeholder="U184i9offjof00ayf7ay~qjtj[jt9FfRfQfk"
      />
      <Greeting>
        <Message>Hello,</Message>
        <Name>{user.profile.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}