import React from 'react';

import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from 'theme';
import TabBarIcon from 'components/icons/TabBarIcon';
import NavigationService from 'utils/NavigationService';
// import { Header } from 'react-native-elements';

const MenuIcon = props => (
  <TouchableOpacity onPress={() => props.onPress()}>
    <TabBarIcon
      name={props.icon || 'ios-menu'}
      size={props.iconsize || 28}
    />
  </TouchableOpacity>
);

export const TopBar = props => (
  <View
    style={{
      margin: 0,
      backgroundColor: Theme.statusbar
    }}
  >
    <View
      style={{
        // margin: 4,
        // marginTop: 0,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        height: 46,
        alignItems: 'center',
        backgroundColor: Theme.statusbar,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Theme.statusbar
      }}
    >
      {props.icon && (
      <MenuIcon
        onPress={props.onPress || NavigationService.toggleDrawer}
        icon={props.icon}
      />
      )}
      {props.children}
    </View>
  </View>
);
