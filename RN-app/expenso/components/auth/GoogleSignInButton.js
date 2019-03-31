import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { authConfig } from 'config';
import { GoogleSignIn } from 'expo';
import { Theme } from 'theme';

GoogleSignIn.allowInClient();

export default class GoogleSignInButton extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.configureAsync();
  }

  configureAsync = async () => {
    try {
      await GoogleSignIn.initAsync({
        isOfflineEnabled: true,
        isPromptEnabled: true,
        clientId: `${authConfig.GOOGLE_ANDROID_CLIENT_ID}`
      });
    } catch ({ message }) {
      console.error(`Demo: Error: init: ${message}`);
    }
    this.syncUserWithStateAsync();
  };

  syncUserWithStateAsync = async () => {
    /*
      const user = await GoogleSignIn.signInSilentlyAsync();
      this.setState({ user });
    */

    if (await GoogleSignIn.signInSilentlyAsync()) {
      const photoURL = await GoogleSignIn.getPhotoAsync(256);
      const user = await GoogleSignIn.getCurrentUserAsync();
      this.setState({
        user: {
          ...user.toJSON(),
          photoURL: photoURL || user.photoURL
        }
      });
      console.log(`GoogleSignInState : ${JSON.stringify(this.state.user)}`);
    } else {
      this.setState({ user: null });
    }
  };

  get buttonTitle() {
    return this.state.user ? 'Sign-Out of Google' : 'Sign-In with Google';
  }

  render() {
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={style.googleButton}
          onPress={this.toggleAuth}
        >
          <Image
            style={[style.icon, { marginHorizontal: 12 }]}
            source={require('../../assets/images/GoogleIcon.png')}
          />
          <Text style={{ color: '#000' }}> Sign-In with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }

  toggleAuth = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  signOutAsync = async () => {
    try {
      // await GoogleSignIn.disconnectAsync();
      await GoogleSignIn.signOutAsync();
      console.log('Log out successful');
    } catch ({ message }) {
      console.error(`Demo: Error: logout: ${message}`);
    } finally {
      this.setState({ user: null });
    }
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();

      if (type === 'success') {
        this.syncUserWithStateAsync();
        console.log(`GoogleLoginSuccess:: ${JSON.stringify(user, null, 4)}`);
        // loginFireUsingGoogleToken(user.auth.accessToken);
        // this.props.navigation.navigate('Loading');
      }
    } catch ({ message }) {
      console.error(`login: Error:${message}`);
    }
  };
}

// class GoogleProfile extends React.PureComponent {
//   render() {
//     const { photoURL, displayName, email } = this.props;
//     return (
//       <View style={styles.container}>
//         {photoURL && (
//           <Image
//             source={{
//               uri: photoURL,
//             }}
//             style={styles.image}
//           />
//         )}
//         <View style={{ marginLeft: 12 }}>
//           <Text style={styles.text}>{displayName}</Text>
//           <Text style={styles.text}>{email}</Text>
//         </View>
//       </View>
//     );
//   }
// }

const style = StyleSheet.create({
  googleButton: {
    backgroundColor: '#fff',
    shadowOpacity: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
    overflow: 'visible',
    shadowColor: 'black',
    alignItems: 'center',
    width: '100%',
    height: 40
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
  // icon: {
  //   alignItems: 'flex-start',
  //   color: 'white',
  // },
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
  icon: { width: 24, aspectRatio: 1 },
  text: { color: 'gray', marginLeft: 12, fontSize: 16, fontWeight: '600' }
});
