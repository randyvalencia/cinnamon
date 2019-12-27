import {Auth} from './types';
import {stFinishWalkthrough, stSaveUser} from '../utils/storage';
import RouteNames from '../RouteNames';
import {requestUserInfo, initAuthorization} from '../api/auth';
import Config from '../Config';

export const loadUserIntoRedux = user => ({
  type: Auth.USER_LOADED,
  payload: user,
});

export const clearLoginFields = () => ({
  type: Auth.CLEAR_LOGIN_FIELDS,
});

export const loginUser = ({showToast, onSuccess}) => async dispatch => {
  console.log('LOGGING USER');
  dispatch({type: Auth.LOGIN_USER_ATTEMPT});
  try {
    const {accessToken} = await initAuthorization();
    onSuccess(accessToken);
  } catch (error) {
    console.log('ERROR :' + error);
    showToast('Something went wrong. Please try again later.');
    dispatch({type: Auth.LOGIN_USER_FAIL, payload: error});
  }
};

export const fetchUser = ({
  accessToken,
  showToast,
  onSuccess,
}) => async dispatch => {
  console.log('FETCHING USER: ' + accessToken);
  dispatch({type: Auth.LOGIN_USER_ATTEMPT});
  try {
    const {sub, userToken, name} = await requestUserInfo({accessToken});

    dispatch({
      type: Auth.LOGIN_USER_SUCCESS,
      payload: createUser({sub, userToken, name}),
    });
    onSuccess();
  } catch (error) {
    console.log('ERROR :' + error);
    showToast('Something went wrong. Please try again later.');
    dispatch({type: Auth.LOGIN_USER_FAIL, payload: error});
  }
};

/**
 * Finish walkthrough
 */
export const finishWalkthrough = navigation => dispatch => {
  console.log('DISPATCHING WALKTHROUGH');
  stFinishWalkthrough(true);
  // Redirect to login
  navigation.navigate(RouteNames.Login);
  dispatch({type: Auth.WALK_THROUGH, payload: 'walkthrough'});
};

// Local functions
const createUser = ({sub, userToken, name}) => {
  const user = {sub, userToken, name};
  Config.logGeneral && console.log('CREATING USER: ', user);
  stSaveUser(user);
  return user;
};
