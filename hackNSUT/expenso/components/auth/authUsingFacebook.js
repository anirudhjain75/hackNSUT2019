import firebase from 'utils/firebase';
import { authStateAsync } from 'components/auth/authFirebase';
import { facebookAuth } from './getOAuthFromProvider';

export const loginFireUsingFaceBook = async () => {
  try {
    const response = await facebookAuth();
    if (response.type === 'success') {
      // eslint-disable-next-line
      const { access_token } = response.params;
      const { url } = response;
      const data = {
        url,
        access_token
      };
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.access_token
      );

      await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then((res) => {
          console.log(`Auth :: ${JSON.stringify(res, null, 4)}`);
          authStateAsync();
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 4));
        });
    }
  } catch (error) {
    throw error;
  }
};

export const loginFireUsingFaceBookToken = async (token) => {
  try {
    const credential = firebase.auth().FacebookAuthProvider.credential(token);

    await firebase.auth
      .signInAndRetrieveDataWithCredential(credential)
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        authStateAsync();
      });
  } catch (error) {
    throw error;
  }
};
