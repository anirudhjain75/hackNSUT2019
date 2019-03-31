import { WebBrowser } from 'expo';
import { signOutUser } from 'components/auth/authFirebase';
import store from 'redux/store';
import { updateUser, updateloginStatus, updateData } from 'redux/action';
import { resetTokenInStore } from 'api/user';
import NavigationService from './NavigationService';

export const handleUrl = (url) => {
  WebBrowser.openBrowserAsync(url);
};

export const onPressLogoutAsync = async () => {
  try {
    await resetTokenInStore();
    await store.dispatch(updateData([]));
    await store.dispatch(updateUser({}));
    await store.dispatch(updateloginStatus(false));
    await signOutUser();
    NavigationService.navigate('Loading');
  } catch (err) {
    // console.log(err);
  }
};
