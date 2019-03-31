import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Theme, styles } from 'theme';
import { authStateAsync } from 'components/auth/authFirebase';
import { verifyEmail, sendPasswordResetEmail } from 'components/auth/authUsingEmail';
import { TextInput } from 'react-native-paper';

class EmailConfirmScreen extends React.Component {
  state = {
    email: '',
    error: '',
    info: ''
  }

  static navigationOptions = {
    // header: null
    title: 'Forgot your password?',
    headerStyle: styles.headerStyle,
    headerTintColor: Theme.white,
    headerTitleStyle: {
      fontWeight: 'normal'
    },
  };

  componentWillMount() {
    const email = this.props.navigation.getParam('email', '');
    console.warn(email);
    this.setState({ email });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.container, { padding: 20 }]}>
        {/* <Text>{this.state.email}</Text> */}
        <Text style={{
          alignSelf: 'center',
          padding: 10
        }}
        >
          {this.state.info && (this.state.info)}
        </Text>
        <TextInput
          onChangeText={value => this.setState({ email: value })}
          keyboardType="email-address"
          underlineColor="transparent"
          value={this.state.email}
          label="Email"
          placeholder="Your email"
          autoCapitalize="none"
          autoFocus
          error={this.state.error ? this.state.error.message : undefined}
        />
        <Text style={styles.errorText}>
          {this.state.error && (this.state.error.message)}
        </Text>

        <TouchableOpacity
          onPress={async () => {
          // OnboardDoneAsync(props, 'Providers');
            try {
              await sendPasswordResetEmail(this.state.email);
              this.setState({ error: null, info: 'Email Sent' });
            } catch (err) {
              this.setState({ error: err });
              console.warn(`error${err}`);
            }
          }}
          style={{
            // alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: Theme.statusbar,
            borderRadius: 4,
            borderColor: Theme.grey,
            borderWidth: 1,
            padding: 10,
            marginTop: 100,
            width: '100%'
          }}
        >
          <Text
            style={{ color: Theme.white, fontSize: 16 }}
          >
          Send Password Reset Email
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EmailConfirmScreen;
