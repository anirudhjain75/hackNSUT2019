import firebase from 'utils/firebase';
import { AsyncStorage } from 'react-native';
import store from 'redux/store';
import moment from 'moment';
import { updateData } from 'redux/action';

export const resetTokenInStore = async () => {
  await AsyncStorage.setItem('userToken', '');
  await AsyncStorage.setItem('userTokenType', '');
};

const processData = (usr) => {
  let dt = '';
  if (!(typeof usr.dateTime === 'undefined' || !usr.dateTime)) {
    dt = new Date(usr.dateTime);
  }
  const obj = {
    ...usr,
    date: !(dt === '') ? moment(dt).format('DD MMM YYYY') : '',
    time: !(dt === '') ? moment(dt).format('h:mm:ss a') : '',
    ago: !(dt === '') ? moment(dt).fromNow() : '',
    initials: usr.name ? usr.name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g).join('') : '',
  };
  return obj;
};

export const updateDataInFirebase = async (data) => {
  if (data.key) {
    const { user } = await store.getState();
    const ref = firebase.database().ref(`data/${user.uid}/${data.key}`);
    const { date, time, ago, initials, ...otherData } = data;
    ref.update({
      ...otherData,
    })
      .then(
        await getDataFromFire()
      );
  }
};
export const getDateAndTimeInIST = () => ({
  dateTime: Date.now()
});

export const storePatientsInFire = async (data) => {
  const dateTime = getDateAndTimeInIST();
  const user = await store.getState().user;
  const ref = firebase.database().ref(`data/${user.uid}`);
  const { key } = ref.push();
  ref.child(key).update({
    key,
    ...data,
    ...dateTime
  }).then((resp) => {
    console.warn('Test', resp);
  }).catch((error) => {
    console.warn('error ', error);
  });
};

// const getUserExpensesData = () => {

// };

export const getDataFromFire = async () => {
  const { user } = await store.getState();
  const patientsDataRef = firebase.database()
    .ref(`data/${user.uid}`)
    .orderByChild('dateTime');
  await patientsDataRef.on('value', (snapshot) => {
    const dataSnap = snapshot.val();
    if (dataSnap) {
      const data = Object.values(dataSnap).reverse();
      store.dispatch(updateData(data.map(processData)));
    }
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
  });
};
