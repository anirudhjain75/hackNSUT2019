import React from 'react';
import { Platform, Text, View } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs';
import { Theme } from 'theme';

import DetailsScreen from 'screens/Main/DetailScreen';
import FormScreen from '../screens/Main/FormScreen';
import TabBarIcon from '../components/icons/TabBarIcon';
import ExploreScreen from '../screens/Main/ExploreScreen';
import DoneScreen from '../screens/Main/ExpenseGraphScreen';

import SearchScreen from '../screens/Main/SearchScreen';


const HomeStack = createStackNavigator({
  Active: ExploreScreen,
});

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Active: HomeStack,
    Done: DoneScreen
  },
  {
    activeColor: Theme.activeTintColor,
    inactiveColor: Theme.inactiveTintColor,
    barStyle: {
      backgroundColor: '#c7c7c7',
    }
  }
);

ExploreScreen.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

DoneScreen.navigationOptions = {
  tabBarLabel: 'Done',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const ExploreStack = createStackNavigator({
  Explore: MainTabNavigator,
  Search: SearchScreen,
  Details: DetailsScreen,
  Appointment: FormScreen,
});

MainTabNavigator.navigationOptions = {
  header: null
};

export default MainTabNavigator;
