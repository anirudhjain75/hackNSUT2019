import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from 'theme/index';
import LoggedUserCard from 'components/cards/LoggedUserCard';

// import { onPressLogoutAsync } from 'utils';

const LogoutCard = props => (
  <View style={styles.container}>
    {props.children}
  </View>
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.grey
  },
  ppContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Theme.grey
  },
  tncContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Theme.grey,
    borderRadius: 4,

    // backgroundColor: Theme.grey,
  },
  logOutButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Theme.darkred,
    borderRadius: 4,
    backgroundColor: Theme.darkred,
    padding: 10
  }
});
export default LogoutCard;
