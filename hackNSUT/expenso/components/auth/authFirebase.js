import firebase from 'utils/firebase';
import { userUpdateAsync } from 'api/update';

export const signOutUser = async () => {
  firebase
    .auth()
    .signOut()
    .then(() => {})
    .catch((error) => {
      console.warn(error);
    });
};

export const authStateAsync = async () => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // if (user.providerData[0].providerId === 'password') {
      // if (user.emailVerified) {
      //   userUpdateAsync(user);
      // } else {
      //   signOutUser();
      // }
      // userUpdateAsync(user);
      // } else {
      userUpdateAsync(user);
      // }
    }
  });
};
