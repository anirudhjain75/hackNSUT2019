import firebase from 'utils/firebase';
import { authStateAsync } from 'components/auth/authFirebase';

import { googleAuth } from './getOAuthFromProvider';

export const loginFireUsingGoogle = async () => {
  try {
    const response = await googleAuth();
    if (response.type === 'success') {
      // eslint-disable-next-line camelcase
      const { access_token } = response.params;
      await loginFireUsingGoogleToken(access_token);
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginFireUsingGoogleToken = async (token) => {
  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
    const res = await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential);
    console.log(`loginFireUsingGoogleToken :: ${JSON.stringify(res)}`);
    await authStateAsync();
  } catch (error) {
    console.warn(error);
  }
};
