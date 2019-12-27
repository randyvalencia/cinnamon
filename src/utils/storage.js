import AsyncStorage from '@react-native-community/async-storage';

// User
const stUserKey = 'user';
export const stGetUser = () =>
  getJsonObjectFromStorage(stUserKey, {onJsonParseError: stRemoveUser});

export const stSaveUser = user =>
  setJsonObjectFromStorage(stUserKey, JSON.stringify(user));

export const stRemoveUser = () => removeJsonObjectFromStorage(stUserKey);

// Walkthrough
const stWalkthroughKey = 'walkthrough';
export const stFinishWalkthrough = isWalkthrough =>
  setJsonObjectFromStorage(stWalkthroughKey, JSON.stringify(isWalkthrough));

export const stGetWalkthrough = () =>
  getJsonObjectFromStorage(stWalkthroughKey, {onJsonParseError: stRemoveUser});

// Clear Storage
export const resetStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

// Local functions
const getJsonObjectFromStorage = (key, params = {}) =>
  new Promise(async resolve => {
    const {onJsonParseError} = params;

    try {
      const dataJson = await AsyncStorage.getItem(key);
      if (!dataJson) {
        resolve(null);
      }

      const data = JSON.parse(dataJson);
      resolve(data);
    } catch (e) {
      onJsonParseError && onJsonParseError();
      resolve(null);
    }
  });

const setJsonObjectFromStorage = async (key, item, params = {}) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (e) {
    // Save error
    console.log(e);
  }
};

const removeJsonObjectFromStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // Clear error
    console.log(e);
  }
};
