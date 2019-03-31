// action types
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_LOGINSTATUS = 'UPDATE_LOGINSTATUS';

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update
});

export const updateData = update => ({
  type: UPDATE_DATA,
  payload: update
});

export const updateSettings = update => ({
  type: UPDATE_SETTINGS,
  payload: update
});

export const updateloginStatus = update => ({
  type: UPDATE_LOGINSTATUS,
  payload: update
});
