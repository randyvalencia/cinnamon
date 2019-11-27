import {Auth} from './types';

export const loadUserIntoRedux = user => ({
  type: Auth.USER_LOADED,
  payload: user,
});

export const clearLoginFields = () => ({
  type: Auth.CLEAR_LOGIN_FIELDS,
});
