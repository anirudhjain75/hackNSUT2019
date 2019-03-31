import firebase from 'utils/firebase';
import { authStateAsync } from 'components/auth/authFirebase';

export const verifyEmail = async () => {
  const user = firebase.auth().currentUser;
  console.info(`User for verifyEmail : ${JSON.stringify(user, null, 4)}`);
  if (user.emailVerified === false) {
    user
      .sendEmailVerification()
      .then(() => {
        console.log('Verification email sent');
      })
      .catch((error) => {
        console.warn(`Errors in Email Verification : ${error}`);
      });
  } else {
    console.log('Email already verfied!');
  }
};

export const signupFire = async (email, password) => {
  console.info('In signupFire');
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.info(res);
    return res;
  } catch (err) {
    throw err;
  }
};

export const resetPassword = async (newPassword) => {
  const user = firebase.auth().currentUser;
  user.updatePassword(newPassword).then(() => {
    // Update successful.
  }).catch((error) => {
    // An error happened.
  });
};

export const sendPasswordResetEmail = async emailAddress => firebase
  .auth().sendPasswordResetEmail(emailAddress);

export const reAuthenticateUser = async (credential) => {
  const user = firebase.auth().currentUser;

  user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
    // User re-authenticated.
  }).catch((error) => {
    // An error happened.
  });
};

export const loginFireWithEmail = async (email, password) => {
  const response = await firebase.auth().signInWithEmailAndPassword(email, password);
  if (!response.user.emailVerified) return 'emailUnverified';
  await authStateAsync();
  return 'success';
};
