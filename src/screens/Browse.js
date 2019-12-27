import React, {Component} from 'react';
import {View, StyleSheet, PanResponder} from 'react-native';
import SearchBlock from '../components/SearchBlock';
import Theme from '../Theme';
import {getCategoriesURL} from '../api/urls';

export default class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitialSearch: true,
      isSearchBlockFocused: false,
      searchText: '',
    };

    this.createKeyboardDismissResponder();
  }

  onSearchBlockFocus = () => this.setState({isSearchBlockFocused: true});
  onSearchBlockBlur = () => this.setState({isSearchBlockFocused: false});
  onSearchTextInputRef = ref => (this.searchTextInput = ref); //TODO: understand this reference input

  onSearchTextChange = text => {
    const additionalProps = text.length === 0 ? {isInitialSearch: true} : {};
    this.setState({searchText: text, ...additionalProps});
  };

  onDelayedInput = async () => {
    const {searchText} = this.state;
    this.setState({
      isInitialSearch: false,
    });
  };

  createKeyboardDismissResponder() {
    const onResponder = () => {
      this.searchTextInput.blur();
      return false;
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: onResponder,
      onStartShouldSetPanResponderCapture: onResponder,
    });
  }

  render() {
    const {searchText} = this.state;
    return (
      <View style={styles.container}>
        <SearchBlock
          value={searchText}
          style={styles.search}
          inputRef={this.onSearchTextInputRef}
          onBlockBlur={this.onSearchBlockBlur}
          onBlockFocus={this.onSearchBlockFocus}
          onChangeText={this.onSearchTextChange}
          onDelayedInput={this.onDelayedInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  search: {
    marginVertical: Theme.spacing.tiny,
  },
  bottomContainer: {
    flex: 1,
  },
});
