import { useContext } from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import WebContext from '../../contexts/WebContext';
import { setOnMessage } from '../../GlobalWebViewProps';
import { signIn, afterSignIn } from './SignInInjectCode';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../RootStackParams';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const webViewRef = useContext(WebContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setUserAndPassword = () => {
    webViewRef?.current?.injectJavaScript(signIn({ username, password }));

    webViewRef?.current?.injectJavaScript(afterSignIn());
  };

  setOnMessage((event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data);
    if (event.nativeEvent.data === 'signin_success')
      navigation.navigate('Forum', { forum: 'General', forumNum: 2 });
    else alert('Sign In details are incorrect');
  });

  return (
    <View style={styles.container}>
      <Text>Usuario:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        autoCompleteType="username"
        autoCorrect={false}
        autoFocus={true}
      />
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        autoCompleteType="password"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Button
        onPress={setUserAndPassword}
        title="Iniciar sesión"
        accessibilityLabel="Inciar sesión"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#ccc',
  },
});
