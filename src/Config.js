/**
 * Config
 */
import {Platform} from 'react-native';

export default {
  isAndroid: Platform.OS === 'android',
  logGeneral: true,
  logNetworkErrors: false,
  auth0: {
    domain: 'randyvalencia.auth0.com',
    clientId: '4zvC7VMlZ4nd9BwtwlIVHx0TpYs9el1s',
  },
};
