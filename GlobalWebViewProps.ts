import { WebViewMessageEvent } from 'react-native-webview';

const defaultOnMessage = (event: WebViewMessageEvent) => {
  console.log(event.nativeEvent.data);
};

let currentOnMessage = defaultOnMessage;

export const setOnMessage = (
  newOnMessage: (event: WebViewMessageEvent) => void,
) => {
  currentOnMessage = newOnMessage;
};

export const setDefaultOnMessage = () => {
  currentOnMessage = defaultOnMessage;
};

export const onMessage = (event: WebViewMessageEvent) => {
  currentOnMessage(event);
};

const defaultOnLoadEnd = () => {
  console.log('Loaded');
};

let currentOnLoadEnd = defaultOnLoadEnd;

export const setOnLoadEnd = (newOnLoadEnd: () => void) => {
  currentOnLoadEnd = newOnLoadEnd;
};

export const setDefaultOnLoadEnd = () => {
  currentOnLoadEnd = defaultOnLoadEnd;
};

export const onLoadEnd = () => {
  currentOnLoadEnd();
};
