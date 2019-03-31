import React from 'react';

import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { styles, Theme } from 'theme';

import { Icon } from 'expo';

export const GoogleSignInButton = (props) => {
  const { login, navigation } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        login().then(() => {
          navigation.navigate('Loading');
        });
      }}
      activeOpacity={0.6}
      style={[styles.touchableButton, localstyle.googleButton]}
    >
      <Image
        style={[localstyle.iconGoogle, { marginHorizontal: 12 }]}
        source={require('../../assets/images/GoogleIcon.png')}
      />
      {/* <Icon.Ionicons
              style={[localstyle.icon, { marginHorizontal: 12, fontSize: 25 }]}
              name="logo-google"
            /> */}
      <Text style={{ color: '#555' }}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

export const FacebookSignInButton = (props) => {
  const { login, navigation } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        login().then(() => {
          navigation.navigate('Loading');
        });
      }}
      activeOpacity={0.6}
      style={[styles.touchableButton, localstyle.facebookButton]}
    >
      <Icon.Ionicons
        name="logo-facebook"
        style={[localstyle.icon, { marginHorizontal: 12, fontSize: 25 }]}
      />
      <Text style={{ color: '#fff' }}>Continue with Facebook</Text>
    </TouchableOpacity>
  );
};

export const LoginSignInButton = (props) => {
  const { navigation } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('SignUp')}
      style={[styles.touchableButton, localstyle.emailButton]}
    >
      <Icon.Ionicons
        style={[localstyle.icon, { marginHorizontal: 12, fontSize: 25 }]}
        name="ios-mail"
      />
      <Text style={{ color: Theme.white }}>Sign-Up with Email</Text>
    </TouchableOpacity>
  );
};

const localstyle = StyleSheet.create({
  emailButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Theme.overlay,
    paddingLeft: 0,
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    width: 24,
    aspectRatio: 1,
    alignItems: 'flex-start',
    color: 'white'
  },
  iconGoogle: {
    width: 24,
    aspectRatio: 1,
    alignItems: 'flex-start'
  },
  googleButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 0,
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  facebookButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  iconButton: {
    width: 50,
    marginHorizontal: 8,
    paddingHorizontal: 0
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
    color: Theme.overlay
  },
  iconRound: {
    marginRight: 9,
    fontSize: 29
  }
});
