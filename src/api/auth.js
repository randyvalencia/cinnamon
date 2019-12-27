import Auth0 from 'react-native-auth0';
import Config from '../Config';

export const auth0base = new Auth0({
  domain: Config.auth0.domain,
  clientId: Config.auth0.clientId,
});

export const initAuthorization = () =>
  new Promise(async (resolve, reject) => {
    console.log('USER AUTH');
    try {
      auth0base.webAuth
        .authorize({scope: 'openid profile email'})
        .then(async credentials => {
          resolve({accessToken: credentials.accessToken});
        })
        .catch(error => {
          console.log('USER AUTH ' + error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const requestUserInfo = ({accessToken}) =>
  new Promise(async (resolve, reject) => {
    console.log('USER INFO');
    try {
      console.log(accessToken);
      auth0base.auth
        .userInfo({token: accessToken})
        .then(async userData => {
          console.log('USER DATA: ' + JSON.stringify(userData));
          resolve({
            sub: userData.sub,
            userToken: accessToken,
            name: userData.name,
          });
        })
        .catch(error => {
          console.log('USER INFO ' + error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
