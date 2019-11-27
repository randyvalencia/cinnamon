// import {Auth} from '../actions/types';

const INITIAL_STATE = {
  loginUsername: '',
};

export default (state = INITIAL_STATE, action) => {
  return {...state, loginUsername: action.payload};
};
