import Electron from 'electron';
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function loginRemotely(email: string, password: string) {
  const emailField = document.querySelector('#username') as HTMLInputElement;

  const passField = document.querySelector('#password') as HTMLInputElement;

  const submitButton = document.querySelector(
    '.login__form_action_container > button'
  ) as HTMLButtonElement;

  emailField.value = email;
  passField.value = password;

  submitButton.click();
}
