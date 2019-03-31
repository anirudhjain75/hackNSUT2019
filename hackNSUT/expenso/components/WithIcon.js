/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform
} from 'react-native';
import {
  TextInput,
  RadioButton,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import { Icon } from 'react-native-elements';

import { styles, Theme } from 'theme/index';

const TextInputWithIcon = props => (
  <View style={{}}>
    <View
      style={localStyles.TextInputContainer}
    >
      <Icon
        name={props.icon || 'md-information-circle-outline'}
        type={props.iconType || 'ionicon'}
        color={Theme.secondary}
        iconStyle={localStyles.leftIcons}
      />
      <View style={localStyles.rightTextInputs}>
        {props.title && (
        <Text style={{ alignSelf: 'flex-start', paddingLeft: 10, color: '#777' }}>{props.title}</Text>
        )}
        {props.children}
      </View>
    </View>
    {
      props.error && (
        <Text style={styles.errorText}>
          {props.error}
        </Text>
      )
    }
  </View>
);

const localStyles = StyleSheet.create({
  TextInputContainer: {
    paddingTop: 20,
    flexDirection: 'row'
  },
  leftIcons: {
    paddingTop: 20,
  },
  rightTextInputs: {
    backgroundColor: Theme.background,
    flex: 1,
    marginLeft: 20
  }
});
export default TextInputWithIcon;
