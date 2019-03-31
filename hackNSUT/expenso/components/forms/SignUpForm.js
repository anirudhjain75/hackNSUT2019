import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme, styles } from 'theme';

const SignUpForm = ({
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
  setFieldValue
}) => (
  <View style={{ flex: 1 }}>
    <KeyboardAvoidingView style={{ marginTop: 20 }}>
      {/* <TextInput
        onChangeText={value => setFieldValue('name', value)}
        mode="outlined"
        value={values.name}
        label="Name"
        onBlur={() => setFieldTouched('name')}
        placeholder="john doe"
        editable={!isSubmitting}
        error={touched.name && errors.name ? errors.name : undefined}
      />
      <Text style={styles.errorText}>
        {touched.name && errors.name ? errors.name : undefined}
      </Text> */}
      <TextInput
        onChangeText={value => setFieldValue('email', value)}
        // mode="outlined"
        keyboardType="email-address"
        underlineColor="transparent"
        value={values.email}
        label="Email"
        autoCapitalize="none"
        onBlur={() => setFieldTouched('email')}
        placeholder="Your email"
        // editable={!isSubmitting}
        error={touched.email && errors.email ? errors.email : undefined}
      />
      <Text style={styles.errorText}>
        {touched.email && errors.email ? errors.email : undefined}
      </Text>

      <TextInput
        theme={{ roundness: 3 }}
        onChangeText={value => setFieldValue('password', value)}
        secureTextEntry
        value={values.password}
        underlineColor="transparent"
        label="password"
        placeholder=""
        autoCapitalize="none"
        onBlur={() => setFieldTouched('password')}
        // editable={!isSubmitting}
        error={
          touched.password && errors.password ? errors.password : undefined
        }
      />
      <Text style={styles.errorText}>
        {touched.password && errors.password ? errors.password : undefined}
      </Text>
    </KeyboardAvoidingView>
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <TouchableOpacity
        onPress={() => {
          handleSubmit();
        }}
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
        <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Continue</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default SignUpForm;
