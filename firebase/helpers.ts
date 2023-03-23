import { FirebaseAuthService } from './FirebaseAuthService';

export const handleLogin = async (

  email: string,
  password: string,
) => {
  if (!password || password.length < 6 || !email) {
    alert('Password or e-mail are not valid. Please try again');
    return;
  }

  try {
    await FirebaseAuthService.loginUser(email, password);
  } catch (error: any) {
    alert('Connection Error. Please try again later.');
  }
};

export const handleRegisterUser = async (
  email: string,
  password: string,
) => {
  if (!password || password.length < 6 || !email) {
    alert('Password or e-mail are not valid. Please try again');
    return;
  }

  try {
    await FirebaseAuthService.registerUser(email, password);
  } catch (error: any) {
    alert('Connection Error. Please try again later.');
  }
};

export const handleSendResetPasswordEmail = (email: string) => {
  if (!email) {
    alert('Missing username!');
    return;
  }

  try {
    FirebaseAuthService.sendPasswordResetEmail(email);
    alert('Please check your e-mail');
  } catch (error: any) {
    alert(error.message);
  }
};

export const handleLoginWithGoogle = async () => {
  try {
    await FirebaseAuthService.logInWithGoogle();
  } catch (error: any) {
    alert('Connection Error. Please try again later.');
  }
};
