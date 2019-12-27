import store from '../store';

export const getCurrentUser = () => store.getState().auth.user || {};
export const getCurrentUsersId = () => getCurrentUser().sub;
export const getCurrentUsersName = () => getCurrentUser().name;
