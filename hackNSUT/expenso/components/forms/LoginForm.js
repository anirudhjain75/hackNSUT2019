import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from 'react-native';

import { styles, Theme } from 'theme';

import { TextInput } from 'react-native-paper';
// import  from 'theme';
// import { TextInputMask } from "react-native-text-input-mask";
// import { RkButton } from 'react-native-ui-kitten';
// import { Icon } from 'expo';
// import  from 'styles';
// import { Theme } from 'theme';

const LoginForm = ({
  values,
  errors,
  touched,
  // eslint-disable-next-line no-unused-vars
  handleBlur,
  isSubmitting,
  setFieldTouched,
  // eslint-disable-next-line no-unused-vars
  handleChange,
  handleSubmit,
  setFieldValue,
  navigation
}) => (
  <KeyboardAvoidingView style={{ marginTop: 20 }}>
    <TextInput
      onChangeText={value => setFieldValue('email', value)}
      keyboardType="email-address"
      underlineColor="transparent"
      // mode="outlined"
      value={values.email}
      label="Email"
      onBlur={() => setFieldTouched('email')}
      placeholder="Your email"
      autoCapitalize="none"
      // editable={!isSubmitting}
      error={touched.email && errors.email ? errors.email : undefined}
    />
    <Text style={styles.errorText}>
      {touched.email && errors.email ? errors.email : undefined}
    </Text>
    <TextInput
      onChangeText={value => setFieldValue('password', value)}
      secureTextEntry
      underlineColor="transparent"
      value={values.password}
      label="password"
      placeholder=""
      onBlur={() => setFieldTouched('password')}
      // editable={!isSubmitting}
      error={touched.password && errors.password ? errors.password : undefined}
    />
    <Text style={styles.errorText}>
      {touched.password && errors.password ? errors.password : undefined}
    </Text>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.6}
        style={[
          styles.touchableButton,
          {
            width: '100%',
            alignItems: 'center',
            backgroundColor: Theme.buttonOk,
            borderRadius: 4,
            padding: 14,
            marginTop: 10,
            marginBottom: 10
          }
        ]}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end'
        }}
        onPress={() => {
          navigation.navigate('PasswordReset', { email: values.email });
        }}
        activeOpacity={0.6}
      >
        <Text style={{ color: '#000', fontWeight: '200' }}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
);

export default LoginForm;
