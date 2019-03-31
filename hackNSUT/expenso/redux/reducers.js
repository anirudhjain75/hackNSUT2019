import { combineReducers } from 'redux';
import {
  UPDATE_DATA,
  UPDATE_USER,
  UPDATE_SETTINGS,
  UPDATE_LOGINSTATUS
} from './action';

const dataReducer = (state = [], action) => {
  if (action.type === UPDATE_DATA) return [...action.payload];
  return state;
};

const settingsReducer = (state = [], action) => {
  if (action.type === UPDATE_SETTINGS) {
    return {
      ...action.payload
    };
  }
  return state;
};

const isLoggedInReducer = (state = false, action) => {
  if (action.type === UPDATE_LOGINSTATUS) {
    return action.payload;
  }
  return state;
};

const userReducer = (state = {}, action) => {
  if (action.type === UPDATE_USER) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({
  user: userReducer,
  isLoggedIn: isLoggedInReducer,
  data: dataReducer,
  settings: settingsReducer
});

export default rootReducer;
