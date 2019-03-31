import React from 'react';
import { Icon } from 'expo';

import { Theme } from 'theme';

const IconWrap = (props) => {
  const size = props.size ? props.size : 28;
  const style = props.style ? props.style : { marginBottom: -4 };
  return (
    <Icon.Ionicons
      name={props.name}
      size={size}
      style={style}
      color={props.focused ? Theme.tabIconSelected : Theme.tabIconDefault}
    >
      {props.children}
    </Icon.Ionicons>
  );
};

export default IconWrap;
