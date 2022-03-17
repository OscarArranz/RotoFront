interface UserCredentials {
  username: string;
  password: string;
}

export const signIn = ({ username, password }: UserCredentials) => `
  const inputs = document.querySelectorAll('.input-text-search');

  inputs[0].value = '${username}';
  inputs[1].value = '${password}';

  document.querySelector('.button').click();
`;

export const afterSignIn = () => `
  const goBackButton = document.querySelector('.rounded-button-editpost');

  if (goBackButton && goBackButton.innerText === 'Regresar') {
    window.ReactNativeWebView.postMessage('signin_failed');
    goBackButton.click();
  } else window.ReactNativeWebView.postMessage('signin_success');
`;
