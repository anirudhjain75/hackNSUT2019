import store from 'redux/store';
import { updateUser, updateloginStatus } from 'redux/action';

export async function userUpdateAsync(user) {
  // console.log(`userUpdateAsync :: ${JSON.stringify(user)}`);
  store.dispatch(updateUser(user));
  store.dispatch(updateloginStatus(true));
}
