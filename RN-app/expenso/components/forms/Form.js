import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme, styles } from 'theme';

const Form = ({
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
  <KeyboardAvoidingView>
    <View style={{
      // flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <View style={{ flex: 3, marginRight: 20 }}>
        <TextInput
          // theme={formtheme}
          onChangeText={value => setFieldValue('name', value)}
          value={values.name}
          label="Name"
          style={{
            backgroundColor: Theme.background,
            // marginTop: 0,
            // border: Theme.grey
          }}
          underlineColor="transparent"
          onBlur={() => setFieldTouched('name')}
          placeholder="John Doe"
          // editable={!isSubmitting}
          error={touched.name && errors.name ? errors.name : undefined}
        />
        <Text style={styles.errorText}>
          {touched.name && errors.name ? errors.name : undefined}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          onChangeText={value => setFieldValue('age', value)}
          // mode="outlined"
          keyboardType="number-pad"
          underlineColor="transparent"
          style={{
            backgroundColor: Theme.background
          }}
          value={values.age}
          label="Age"
          onBlur={() => setFieldTouched('email')}
          placeholder="18"
          // editable={!isSubmitting}
          error={touched.age && errors.age ? errors.age : undefined}
        />
        <Text style={styles.errorText}>
          {touched.age && errors.age ? errors.age : undefined}
        </Text>
      </View>
    </View>
    <View style={{
      // flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <View style={{ flex: 1, marginRight: 20 }}>

        <TextInput
          onChangeText={value => setFieldValue('email', value)}
          // mode="outlined"
          style={{
            backgroundColor: Theme.background
          }}
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
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          theme={{ roundness: 6 }}
          onChangeText={value => setFieldValue('phone', value)}
          // mode="outlined"
          style={{
            backgroundColor: Theme.background
          }}
          value={values.phone}
          keyboardType="phone-pad"
          underlineColor="transparent"
          label="Phone"
          placeholder="+919876543210"
      // disabled={errors.phone}
          onBlur={() => setFieldTouched('phone')}
      // editable={!isSubmitting}
          error={
            touched.phone && errors.phone ? errors.phone : undefined
          }
        />
        <Text style={styles.errorText}>
          {touched.phone && errors.phone ? errors.phone : undefined}
        </Text>
      </View>
    </View>
    <TextInput
      theme={{ roundness: 6 }}
      onChangeText={value => setFieldValue('problem', value)}
          // mode="outlined"
      style={{
        backgroundColor: Theme.background
      }}
      numberOfLines={6}
      multiline
      value={values.problem}
      underlineColor="transparent"
      label="Problem"
      placeholder=""
      disabled={errors.problem}
      onBlur={() => setFieldTouched('problem')}
      editable={!isSubmitting}
      error={
            touched.problem && errors.problem ? errors.problem : undefined
          }
    />
    <Text style={styles.errorText}>
      {touched.problem && errors.problem ? errors.problem : undefined}
    </Text>
    <TouchableOpacity
      onPress={() => {
        handleSubmit();
      }}
      activeOpacity={0.6}

      style={[
        styles.touchableButton,
        {
          width: '100%',
          alignItems: 'center',
          backgroundColor: Theme.red,
          borderRadius: 4,
          padding: 14,
          marginTop: 10,
          marginBottom: 10
        }
      ]}
    >
      <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Continue</Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>
);

export default Form;
