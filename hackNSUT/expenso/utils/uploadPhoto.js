import uuid from 'uuid';

import firebase from './firebase';

export async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const metadata = {
    contentType: 'image/jpeg'
  };

  const blob = await new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    // eslint-disable-next-line func-names
    xhr.onload = function () {
      resolve(xhr.response);
    };
    // eslint-disable-next-line func-names
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  const user = firebase.auth().currentUser;
  // or
  // const user = await store.getState().user;
  const ref = firebase
    .storage()
    .ref()
    .child('users')
    .child(`${user.uid}`)
    .child('images')
    .child(uuid.v4());
  const snapshot = await ref.put(blob, metadata);
  blob.close();
  const url = await snapshot.ref.getDownloadURL();
  const QUERY = `https://cryptic-springs-10058.herokuapp.com/getdata?q=${url}&uid=${user.uid}&key=test}`;
  fetch(QUERY).then(() => { console.log('DONE'); });
  return url;
}
