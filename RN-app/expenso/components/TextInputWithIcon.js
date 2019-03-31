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
  <View style={{ }}>
    <View
      style={localStyles.TextInputContainer}
    >
      <Icon
        name={props.icon || 'md-information-circle-outline'}
        type={props.iconType || 'ionicon'}
        color={Theme.secondary}
        size={20}
        iconStyle={localStyles.leftIcons}
      />
      <TextInput
        {...props}
        underlineColor={Theme.dark}
        // underlineColorAndroid={Theme.accent}
        style={localStyles.rightTextInputs}
      />

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
    paddingBottom: 10,
    flexDirection: 'row'
  },
  leftIcons: {
    marginTop: 20,
    height: 20,
    width: 20
  },
  rightTextInputs: {
    backgroundColor: Theme.background,
    // borderBottomWidth: 1,
    // borderColor: '#fff',
    flex: 1,
    marginLeft: 20
  }
});
export default TextInputWithIcon;
