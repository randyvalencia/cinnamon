import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {NetworkProvider, NetworkConsumer} from 'react-native-offline';
import {RootStack} from './Routes';
import store from './store';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';

import IconFeather from 'react-native-vector-icons/Feather';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadFonts();
  }

  loadFonts() {
    IconMaterial.loadFont();
    IconEntypo.loadFont();
    IconFeather.loadFont();
  }

  render() {
    return (
      <Provider store={store}>
        <NetworkProvider>
          <View style={{flex: 1}}>
            <RootStack />
          </View>
        </NetworkProvider>
      </Provider>
    );
  }
}

export default App;
