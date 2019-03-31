import React from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';

import { Theme } from 'theme';
import Layout from 'theme/constants/Layout';
import { onPressLogoutAsync } from 'utils';
import LoggedUserCard from 'components/cards/LoggedUserCard';
import MainTabNavigator from 'navigation/MainTabNavigator';
import FormScreen from 'screens/Main/FormScreen';
import GainsFormScreen from 'screens/Main/GainsFormScreen';
import ExploreStack from './ExploreStack';

export const TermsLogoutCard = () => (
  <TouchableOpacity
    style={{
      margin: 8,
      padding: 10,
      backgroundColor: Theme.red
    }}
    onPress={() => { onPressLogoutAsync(); }}
  >
    <Text style={[{ color: Theme.white, fontWeight: 'bold' }]}>Logout</Text>
  </TouchableOpacity>
);

MainTabNavigator.navigationOptions = {
  headerVisible: false,
};

const DrawerContent = props => (
  <View style={{ flex: 1, backgroundColor: Theme.background, justifyContent: 'space-between' }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'always' }}>
      <LoggedUserCard />
      <DrawerItems {...props} />
    </SafeAreaView>
    <TermsLogoutCard />
  </View>
);

const MainDrawNavigator = createDrawerNavigator(
  {
    Home: MainTabNavigator,
    Expenses: FormScreen,
    Gains: GainsFormScreen,
  },
  {
    contentComponent: DrawerContent,
    drawerWidth: Layout.window.width - (Platform.OS === 'android' ? 46 : 64),
    contentOptions: {
      activeTintColor: Theme.activeTintColor,
      inactiveTintColor: Theme.inactiveTintColor,
      activeBackgroundColor: Theme.grey,
      style: {
        marginVertical: 0,
        flex: 1,
        backgroundColor: Theme.sidebar,
      },
      labelStyle: {
        fontWeight: 'bold',
        fontFamily: 'space-mono',
      }
    },
  }
);

export default MainDrawNavigator;
