import { createContext, RefObject } from 'react';
import WebView from 'react-native-webview';

const WebContext = createContext<RefObject<
  WebView<Record<string, unknown>>
> | null>(null);

export const WebProvider = WebContext.Provider;

export default WebContext;
