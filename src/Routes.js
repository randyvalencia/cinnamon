/**
 * Routes
 */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Splash from './screens/Splash';
import RouteNames from './RouteNames';

export const RootStack = createAppContainer(
  createSwitchNavigator({
    [RouteNames.Splash]: {screen: Splash},
  }),
);
