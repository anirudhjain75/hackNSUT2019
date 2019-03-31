import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Facebook, Icon } from 'expo';
import { authConfig } from 'config';
import { loginFireUsingFaceBookToken } from 'components/auth/authUsingFacebook';
import { Theme } from 'theme';

export default class FacebookSignInButton extends React.Component {
  toggleAuth = async (permissions) => {
    this.testFacebookLogin(authConfig.FB_APP_ID, permissions, 'web');
  };

  testFacebookLogin = async (id, perms, behavior = 'web') => {
    try {
      const result = await Facebook.logInWithReadPermissionsAsync(id, {
        permissions: perms,
        behavior
      });

      const { type, token } = result;

      if (type === 'success') {
        Alert.alert('Logged in!', JSON.stringify(result), [
          {
            text: 'OK!',
            onPress: async () => {
              console.log({ type, token });
              await loginFireUsingFaceBookToken(token);
              this.props.navigation.navigate('Loading');
            }
          }
        ]);
      }
    } catch (e) {
      Alert.alert('Error!', e.message, [{ text: 'OK', onPress: () => {} }]);
    }
  };

  render() {
    const permissions = ['public_profile', 'email', 'user_friends'];
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={style.facebookButton}
          onPress={() => this.toggleAuth(permissions)}
        >
          <Icon.Ionicons
            name="logo-facebook"
            style={[style.icon, { marginHorizontal: 12, fontSize: 25 }]}
          />
          <Text style={{ color: '#fff' }}>Sign-In with Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#4267B2',
    shadowOpacity: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
    overflow: 'visible',
    shadowColor: 'black',
    alignItems: 'center',
    marginTop: 20,
    height: 40
  },
  circleIconButton: {
    width: 44,
    paddingHorizontal: 0,
    marginHorizontal: 9
  },
  textSpace: {
    marginVertical: 3
  },

  primaryIcon: {
    color: Theme.primary
  },
  successIcon: {
    color: Theme.secondary
  },
  iconRound: {
    marginRight: 9,
    fontSize: 29
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    color: 'white',
    aspectRatio: 1
  },
  text: {
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600'
  }
});
