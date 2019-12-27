import {Auth} from '../actions/types';

const INITIAL_STATE = {
  loginUsername: '',
  loginIsLoading: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.USER_LOADED:
      return {...INITIAL_STATE, user: action.payload};
    case Auth.LOG_OUT:
      return {...INITIAL_STATE, user: action.payload};
    case Auth.WALK_THROUGH:
      return {...INITIAL_STATE};
    case Auth.LOGIN_USER_ATTEMPT:
      return {...state, loginIsLoading: true};
    case Auth.LOGIN_USER_SUCCESS:
      return {...INITIAL_STATE, user: action.payload};
    case Auth.LOGIN_USER_FAIL:
      return {...state, loginIsLoading: false};
    default:
      return {...state};
  }
};
