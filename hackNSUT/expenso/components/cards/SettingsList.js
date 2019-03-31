import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from 'theme';
import { ListItem } from 'react-native-elements';

export class SettingsList extends React.Component {
  state = {
    isExpanded: false
  };

  render() {
    const { item } = this.props;
    return (
      <View>
        <ListItem
          windowBackgroundColor={Theme.grey}
          title={item.name}
          subtitle={(
            <View style={styles.subtitleView}>
              <Text style={styles.ratingText}>5 months ago</Text>
            </View>
          )}
          leftIcon={{ name: item.icon }}
          rightIcon={{ name: 'arrow-forward' }}
          onPress={() => {
            const { isExpanded } = this.state;
            this.setState({ isExpanded: !isExpanded });
          }}
        />
        {this.state.isExpanded && (
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              padding: 20
            }}
          >
            <Text>Todo..</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    color: Theme.text
  }
});
