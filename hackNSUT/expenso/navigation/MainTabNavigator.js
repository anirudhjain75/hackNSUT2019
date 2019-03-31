import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import DetailsScreen from 'screens/Main/DetailScreen';
import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs';
import SearchScreen from 'screens/Main/SearchScreen';
import { Theme } from 'theme';
import FormScreen from '../screens/Main/FormScreen';
import TabBarIcon from '../components/icons/TabBarIcon';
import ExploreScreen from '../screens/Main/ExploreScreen';
import ExpenseGraphScreen from '../screens/Main/ExpenseGraphScreen';
import IncomeGraphScreen from '../screens/Main/IncomeGraphScreen';

const HomeStack = createStackNavigator({
  Active: ExploreScreen,
  Search: SearchScreen,
  Details: DetailsScreen,
}, {
  headerMode: 'none'
});

HomeStack.navigationOptions = {
  headerVisible: false,
  tabBarLabel: 'Transactions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-list'
      }
    />
  ),
};


const GraphTab = createMaterialTopTabNavigator({
  Expense: ExpenseGraphScreen,
  Income: IncomeGraphScreen,
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
      color: Theme.white
    },
    tabStyle: {
      // width: 100,
      // borderBottomColor: Theme.green
    },
    style: {
      backgroundColor: Theme.statusbar,
    },
    indicatorStyle: {
      backgroundColor: Theme.primary,
    }
  }
});

GraphTab.navigationOptions = {
  headerVisible: false,
  tabBarLabel: 'Graphs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-sync' : 'md-sync'}
    />
  ),
};

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

export default createMaterialBottomTabNavigator({
  HomeStack,
  GraphTab,
  // SettingsStack,
}, {
  headerVisible: false,
});
