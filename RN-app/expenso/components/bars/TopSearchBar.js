import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Theme } from 'theme';
import { Appbar } from 'react-native-paper';
import NavigationService from 'utils/NavigationService';
import { TopBar } from './TopBar';

class TopSearchBar extends React.Component {
  render() {
    const { navigation, data } = this.props;
    return (
      <TopBar icon="ios-menu" iconsize={14}>
        <TouchableOpacity
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingLeft: 12,
            flex: 1,
            alignItems: 'center',
            backgroundColor: Theme.statusbar
          }}
          onPress={() => {
            navigation.navigate('Search', { data });
          }}
        >
          {/* <TabBarIcon name="ios-search" size={24} /> */}
          <Text
            style={{
              textAlign: 'left',
              paddingLeft: 16,
              color: '#999',
              // fontWeight: 'bold',
              fontSize: 18
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </TopBar>
    );
  }
}

const TopSearch = (props) => {
  const { navigation, data } = props;
  return (
    <Appbar.Header
      statusBarHeight={0}
      theme={{ colors: { primary: Theme.statusbar, text: Theme.grey } }}
    >
      <Appbar.Action
        icon="menu"
        style={{ fontWeight: 'normal' }}

        onPress={NavigationService.toggleDrawer}
      />
      <Appbar.Content
        style={{ fontWeight: 'normal' }}
        title={props.title}
      />
      <Appbar.Action


        icon="search"
        onPress={() => {
          navigation.navigate('Search', { data });
        }}
      />
    </Appbar.Header>
  );
};

export default TopSearch;
