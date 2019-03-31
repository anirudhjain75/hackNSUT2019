import React from 'react';
import { StyleSheet, Text, TouchableHighlight, PixelRatio } from 'react-native';
import { Theme } from 'theme';

export default class ListButton extends React.Component {
  render() {
    const style = [styles.button];

    const labelStyles = [styles.label];
    if (this.props.disabled) {
      style.push(styles.disabledButton);
      labelStyles.push(styles.disabledLabel);
    }
    return (
      <TouchableHighlight
        style={style}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        underlayColor="#dddddd"
      >
        <Text style={labelStyles}>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1.0 / PixelRatio.get(),
    borderBottomColor: '#cccccc'
  },
  disabledButton: {},
  label: {
    color: Theme.tintColor,
    fontWeight: '700'
  },
  disabledLabel: {
    color: '#999999'
  }
});
