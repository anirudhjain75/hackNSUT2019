import React from 'react';
import { Theme } from 'theme';
import { Appbar } from 'react-native-paper';
// import NavigationService from 'utils/NavigationService';

class TopHeader extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
    return (
      <Appbar.Header
        statusBarHeight={0}
        theme={{ colors: { primary: Theme.statusbar, text: Theme.darktext } }}
      >
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title={this.props.title}
          // subtitle="Subtitle"
        />
        {/* <Appbar.Action icon="search" onPress={this._onSearch} /> */}
        {/* <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
      </Appbar.Header>
    );
  }
}

export default TopHeader;
