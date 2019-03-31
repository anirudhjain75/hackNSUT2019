import { AsyncStorage } from 'react-native';

export const getStoredToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const type = await AsyncStorage.getItem('userTokenType');
  return { token, type };
};

export const getStoredItem = async (ITEM_NAME) => {
  const ITEM = await AsyncStorage.getItem(ITEM_NAME);
  // console.log(`Log: ITEM: ${ITEM}`);
  return ITEM;
};

export const storeItemAsync = async (ITEM_NAME, ITEM) => {
  try {
    await AsyncStorage.setItem(ITEM_NAME, ITEM);
  } catch (err) {
    throw err;
  }
};

export const storeTokenInStore = async (tokenData) => {
  try {
    await AsyncStorage.setItem('userToken', tokenData.token);
    await AsyncStorage.setItem('userTokenType', tokenData.type);
    return 'success';
  } catch (err) {
    // console.warn(err);
    throw err;
  }
};
