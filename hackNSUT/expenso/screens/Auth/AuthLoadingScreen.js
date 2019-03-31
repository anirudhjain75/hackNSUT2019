import React from 'react';
import { View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { styles, Theme } from 'theme';

import { authStateAsync } from 'components/auth/authFirebase';

class AuthLoadingScreen extends React.Component {
  bootstrapAsync = async () => {
    await authStateAsync();
  };

  componentDidMount() {
    this.bootstrapAsync();
    this.props.navigation.navigate(this.props.isLoggedIn ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Theme.statusbar}
          barStyle={Theme.barStyle}
        />
        <ActivityIndicator />
        <Text>{this.props.isLoggedIn}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(AuthLoadingScreen);
