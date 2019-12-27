/**
 * Splash Screen
 */

import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, UIManager, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import RouteNames from '../RouteNames';
import {loadUserIntoRedux, finishWalkthrough} from '../actions';
import {stGetUser, stGetWalkthrough, resetStorage} from '../utils/storage';

import Config from '../Config';
import Theme from '../Theme';

class Splash extends React.Component {
  mounted = false;
  state = {
    showRealApp: false,
    ready: false,
  };

  constructor(props) {
    super(props);
    //this.clearAsyncStorage(); // reset
    this.loadUser();
  }

  componentDidMount() {
    this.mounted = true;
    this.configureLayoutAnimation();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  configureLayoutAnimation() {
    if (Config.isAndroid) {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  loadUser = async () => {
    const {navigation, loadUserIntoRedux} = this.props;
    const user = await stGetUser();
    const isUserWalkthrough = await stGetWalkthrough();

    if (user) {
      loadUserIntoRedux(user);
      console.log('USER LOGGED IN: ' + user.name);
      navigation.navigate(RouteNames.Home);
    } else {
      if (isUserWalkthrough) {
        navigation.navigate(RouteNames.Login);
        console.log('USER FINISHED WALKTHROUGH');
      }
    }
    if (this.mounted) {
      this.setState({ready: true});
    }
  };

  onDone = () => {
    const {navigation, finishWalkthrough} = this.props;
    finishWalkthrough(navigation);
    this.setState({showRealApp: true});
  };

  clearAsyncStorage = () => {
    resetStorage();
  };

  render() {
    if (this.state.ready) {
      if (this.state.showRealApp) {
        return <Splash />;
      } else {
        return <AppIntroSlider slides={slides} onDone={this.onDone} />;
      }
    } else {
      return <View style={styles.container} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
  },
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  common: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: {
      uri: 'https://i.imgur.com/jr6pfzM.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: {
      uri: 'https://i.imgur.com/jr6pfzM.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: {
      uri: 'https://i.imgur.com/jr6pfzM.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  },
];

const mapStateToProps = ({auth: {user}}) => ({user});

export default connect(
  mapStateToProps,
  {loadUserIntoRedux, finishWalkthrough},
)(Splash);
