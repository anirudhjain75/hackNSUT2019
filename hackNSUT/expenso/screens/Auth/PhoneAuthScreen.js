import React from 'react';
import { Text, ScrollView, TouchableOpacity, View } from 'react-native';
import { Linking, WebBrowser } from 'expo';
import firebase from 'utils/firebase';
import { TextInput } from 'react-native-paper';
import { Theme, styles } from 'theme';
import { firebaseConfig } from 'config';

const captchaUrl = `${firebaseConfig.hostingURL}/captcha.html?appurl=${Linking.makeUrl('')}`;

// const captchaUrl = '/'
//  + `captcha.html?PhoneAuthScreenurl=${Linking.makeUrl('')}`;

const Button = props => (
  <TouchableOpacity {...props}>
    <Text style={{ color: Theme.white }}>{props.title}</Text>
  </TouchableOpacity>
);

export default class PhoneAuthScreen extends React.Component {
  static navigationOptions = {
    // header: null
    title: 'Login with Phone',
    headerStyle: styles.headerStyle,
    headerTintColor: Theme.white,
    headerTitleStyle: {
      fontWeight: 'normal'
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      phone: '+91',
      confirmationResult: undefined,
      code: '',
      message: ''
    };
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  onPhoneChange = (phone) => {
    this.setState({ phone });
  }

  onPhoneComplete = async () => {
    let token = null;
    const listener = ({ url }) => {
      WebBrowser.dismissBrowser();
      const tokenEncoded = Linking.parse(url).queryParams.token;
      if (tokenEncoded) { token = decodeURIComponent(tokenEncoded); }
    };
    Linking.addEventListener('url', listener);
    await WebBrowser.openBrowserAsync(captchaUrl);
    Linking.removeEventListener('url', listener);
    if (token) {
      const { phone } = this.state;
      // fake firebase.auth.PhoneAuthScreenlicationVerifier
      const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(token)
      };
      try {
        const confirmationResult = await firebase
          .auth().signInWithPhoneNumber(phone, captchaVerifier);
        this.setState({ confirmationResult });
      } catch (e) {
        console.warn(e);
      }
    }
  }

  onCodeChange = (code) => {
    this.setState({ code });
  }

  onSignIn = async () => {
    const { confirmationResult, code } = this.state;
    try {
      await confirmationResult.confirm(code);
    } catch (e) {
      console.warn(e);
    }
    this.reset();
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  }

  reset = () => {
    this.setState({
      phone: '',
      // eslint-disable-next-line react/no-unused-state
      phoneCompleted: false,
      confirmationResult: undefined,
      code: ''
    });
  }

  render() {
    if (this.state.user) {
      this.props.navigation.navigate('Loading');
    }
    if (!this.state.confirmationResult) {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignContent: 'center', padding: 20 }}>

          {this.state.message !== '' && (
            <Text style={[styles.monoText, { marginBottom: 20, color: Theme.red }]}>
              {this.state.message}
            </Text>
          )}

          <Text style={[styles.monoText, { marginBottom: 20 }]}>Enter your phone</Text>
          {/* <TextInput
            value={this.state.phone}
            onChangeText={this.onPhoneChange}
            keyboardType="phone-pad"
            placeholder="+91"
            underlineColor="transparent"
            // mode="outlined"
            label="Country Code"
          /> */}
          <TextInput
            value={this.state.phone}
            onChangeText={this.onPhoneChange}
            keyboardType="phone-pad"
            placeholder="Your phone"
            underlineColor="transparent"
            // mode="outlined"
            label="Your phone number"
          />
          <Button
            activeOpacity={0.6}
            style={[
              styles.touchableButton,
              {
                width: '100%',
                alignItems: 'center',
                borderRadius: 4,
                padding: 14,
                marginTop: 80,
                marginBottom: 10
              }
            ]}
            onPress={() => {
              const test = this.state.phone;
              if (this.state.phone[0] !== '+') {
                this.setState({ phone: `+91${test}` });
              }
              if ((/^\+?[1-9]\d{8,14}$/).test(this.state.phone)) {
                console.warn(this.state.phone);
                this.onPhoneComplete();
              } else {
                this.setState({ message: 'Enter a valid number.' });
              }
            }}
            title="Next"
          />
        </View>
      );
    } else {
      return (
        <ScrollView style={{ padding: 20, marginTop: 40 }}>
          <Text style={[styles.monoText, { marginBottom: 20 }]}>
            Enter Code Send to
            {' '}
            {this.state.phone}
          </Text>
          <TextInput
            underlineColor="transparent"
            value={this.state.code}
            onChangeText={this.onCodeChange}
            keyboardType="numeric"
            placeholder="Code from SMS"
          />
          <Button
            style={[
              styles.touchableButton,
              {
                width: '100%',
                alignItems: 'center',
                borderRadius: 4,
                padding: 14,
                marginTop: 10,
                marginBottom: 10
              }
            ]}
            onPress={this.onSignIn}
            title="Sign in"
          />
        </ScrollView>
      );
    }
  }
}
