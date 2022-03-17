import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { WebProvider } from './contexts/WebContext';
import { onMessage, onLoadEnd } from './GlobalWebViewProps';
import ForumScreen from './screens/Forum/ForumScreen';
import { RootStackParamList } from './screens/RootStackParams';
import SignInScreen from './screens/SignIn/SignInScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const webViewRef = useRef<WebView>(null);

  return (
    <View>
      <View style={{ height: '100%', width: '100%' }}>
        <WebProvider value={webViewRef}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="Forum" component={ForumScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </WebProvider>
      </View>
      <WebView
        style={{ height: 0, width: 0 }}
        ref={webViewRef}
        source={{
          uri: 'https://forocoches.com/foro/misc.php?do=page&template=ident',
        }}
        onMessage={onMessage}
        onLoadEnd={onLoadEnd}
      />
    </View>
  );
}
