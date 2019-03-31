import React from 'react';
import { Icon } from 'expo';

import { Theme } from 'theme/index';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={this.props.size || 26}
        style={{
          alignItems: 'center'
        }}
        color={
          this.props.focused ? Theme.tabIconSelected : Theme.tabIconDefault
        }
      />
    );
  }
}
