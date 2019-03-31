import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Theme, styles } from 'theme';
import { authStateAsync } from 'components/auth/authFirebase';
import { verifyEmail } from 'components/auth/authUsingEmail';

const EmailConfirmScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
          A Confirmation Email was sent.
      </Text>
      <Text>
          Click on the link to Confirm.
      </Text>
      <TouchableOpacity
        onPress={async () => {
          // OnboardDoneAsync(props, 'Providers');
          await authStateAsync();
          navigation.navigate('Loading');
        }}
        style={{
          alignItems: 'center',
          backgroundColor: Theme.primary,
          borderRadius: 4,
          padding: 10,
          marginTop: 10,
          width: '70%'
        }}
      >
        <Text
          style={{ color: Theme.surface, fontSize: 18, fontWeight: 'bold' }}
        >
          Press if Confirmed
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // OnboardDoneAsync(props, 'Providers');
          await verifyEmail();
        }}
        style={{
          alignItems: 'center',
          // backgroundColor: Theme.primary,
          borderRadius: 4,
          borderColor: Theme.grey,
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          width: '70%'
        }}
      >
        <Text
          style={{ color: Theme.Text, fontSize: 16, fontWeight: 'bold' }}
        >
            Resend Email
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate('SignUp');
        }}
        style={{
          alignItems: 'center',
          backgroundColor: Theme.overlay,
          borderRadius: 4,
          borderColor: Theme.grey,
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          width: '70%'
        }}
      >
        <Text
          style={{ color: Theme.white, fontSize: 16, fontWeight: 'bold' }}
        >
            Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};
EmailConfirmScreen.navigationOptions = {
  header: null
};
export default EmailConfirmScreen;
