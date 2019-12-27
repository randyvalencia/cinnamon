/**
 * Routes
 */
import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  StackActions,
} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Splash from './screens/Splash';
import Login from './screens/Login';
import Browse from './screens/Browse';
import Explore from './screens/Explore';
import Library from './screens/Library';

import {getFontStyleObject} from './utils/font';
import NavbarWrapper from './components/NavbarWrapper';
import NavbarButtonWrapper from './components/NavbarButtonWrapper';

import Header from './components/Header';

import {
  getNavbarBrowseIcon,
  getNavbarExploreIcon,
  getNavbarLibraryIcon,
} from './utils/icons';

import RouteNames from './RouteNames';
import Theme from './Theme';

const defaultHeaderObject = {
  header: props => <Header scene={props.scene} />,
};

const TabNames = {
  browse: 'Browse',
  explore: 'Explore',
  library: 'Library',
};

const createDefaultStackNavigator = (screensObject, customOptions) =>
  createStackNavigator(screensObject, {
    defaultNavigationOptions: {...defaultHeaderObject},
    cardStyle: {
      backgroundColor: '#000',
    },
    headerMode: 'screen',
    ...customOptions,
  });

// Navigation
const BottomTabs = createBottomTabNavigator(
  {
    [TabNames.browse]: {
      screen: createDefaultStackNavigator({
        Browse,
      }),
    },
    [TabNames.explore]: {
      screen: createDefaultStackNavigator({Explore}),
    },
    [TabNames.library]: {
      screen: createDefaultStackNavigator({
        Library,
      }),
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Theme.colors.bottomNavbar,
      inactiveBackgroundColor: Theme.colors.bottomNavbar,
      activeTintColor: Theme.gray.lightest,
      inactiveTintColor: Theme.gray.light,
      labelStyle: {...getFontStyleObject()},
      style: {
        borderTopColor: Theme.colors.bottomNavbar,
        height: Theme.specifications.bottomNavbarHeight,
        backgroundColor: Theme.colors.bottomNavbar,
      },
    },
    defaultNavigationOptions: ({navigation}) => ({
      lazy: false,
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        switch (routeName) {
          case TabNames.browse:
            return getNavbarBrowseIcon({tintColor});
          case TabNames.explore:
            return getNavbarExploreIcon({tintColor});
          case TabNames.library:
            return getNavbarLibraryIcon({tintColor});
          default:
            return null;
        }
      },
      tabBarComponent: NavbarWrapper,
      tabBarButtonComponent: NavbarButtonWrapper,
      tabBarOnPress: ({navigation, defaultHandler}) => {
        navigation.dispatch(StackActions.popToTop());
        defaultHandler();
      },
    }),
  },
);

const HomeStack = createStackNavigator(
  {[RouteNames.BottomTabs]: {screen: BottomTabs}},
  {defaultNavigationOptions: () => ({header: null})},
);

export const RootStack = createAppContainer(
  createSwitchNavigator({
    [RouteNames.Splash]: {screen: Splash},
    [RouteNames.Login]: {screen: Login},
    [RouteNames.Home]: {screen: HomeStack},
  }),
);
