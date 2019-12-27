import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import Theme from '../../Theme';
import {getFontStyleObject} from '../../utils/font';

export default class AppText extends Component {
  render() {
    const {children, style, type} = this.props;

    !Theme.typography[type] &&
      console.warn(`AppText: There is no ${type} type in typography.`);

    const textStyles = [styles.text, Theme.typography[type], style];

    return (
      <Text {...this.props} style={textStyles}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Theme.gray.lightest,
    ...getFontStyleObject(),
  },
});

AppText.propTypes = {
  type: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
};

AppText.defaultProps = {
  type: 'body',
};
