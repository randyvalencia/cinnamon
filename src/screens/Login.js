import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Theme from '../Theme';
import AppText from '../components/common/AppText';
import AppButton from '../components/common/AppButton';
import PageSpinner from '../components/common/PageSpinner';
import AppToast from '../components/AppToast';
import {fetchUser, loginUser} from '../actions';
import RouteNames from '../RouteNames';

class Login extends Component {
  onToastRef = ref => (this.toast = ref);
  showToast = message => this.toast.show(message, 2000);
  onLoginPress = () => {
    const {navigation} = this.props;

    // Login user via auth0
    this.props.loginUser({
      showToast: this.showToast,
      onSuccess: accessToken => {
        console.log('SUCCESSFUL INIT AUTH0' + accessToken);

        // Fetch user
        this.props.fetchUser({
          accessToken: accessToken,
          showToast: this.showToast,
          onSuccess: () => {
            console.log('SUCCESSFUL USER PROFILE');
            // Redirect to Home Stack
            navigation.navigate(RouteNames.Home);
          },
        });
      },
    });
  };

  render() {
    const {loginIsLoading} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <FastImage
              style={styles.imgLogo}
              source={require('../assets/img/tmdb.png')}
              resizeMode="contain"
            />
            <AppText style={styles.welcomeText} type="title1">
              Welcome to HeadSouth
            </AppText>
            <AppText style={styles.welcomeCaption} type="titleCaption">
              Powered by One South Database
            </AppText>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            solid
            toScale={false}
            style={styles.button}
            textStyle={styles.buttonText}
            color={Theme.colors.success}
            onPress={this.onLoginPress}>
            Log In
          </AppButton>
          <AppButton
            solid
            toScale={false}
            style={styles.button}
            textStyle={styles.buttonText}
            color={Theme.colors.info}
            onPress={this.onLoginPress}>
            Sign Up
          </AppButton>
        </View>
        <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={loginIsLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    flex: 7,
    justifyContent: 'space-between',
  },
  imgLogo: {
    width: null,
    height: 100,
    marginTop: Theme.spacing.large * 2,
    marginBottom: Theme.spacing.large,
  },
  welcomeText: {
    textAlign: 'center',
  },
  welcomeCaption: {
    color: Theme.gray.lighter,
    textAlign: 'center',
  },
  guestButton: {
    height: 48,
    alignSelf: 'center',
    paddingHorizontal: Theme.spacing.base,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
  button: {
    flex: 1,
  },
  buttonText: {
    fontSize: 26,
  },
});

const mapStateToProps = ({auth}) => auth;

export default connect(
  mapStateToProps,
  {fetchUser, loginUser},
)(Login);
