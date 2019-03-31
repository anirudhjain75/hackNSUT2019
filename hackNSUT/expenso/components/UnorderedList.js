import React from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';

export class UnorderedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows(this.props.data),
    };
  }

  renderRow = (item) => {
    this.COUNT -= 1;
    return (
      <View style={{
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
      >
        <Text style={{ padding: 4 }}>{`${item}`}</Text>
        <Text style={{ padding: 4 }}>{this.COUNT > 0 && '\u2022'}</Text>
      </View>
    );
  }

  render() {
    this.COUNT = this.props.data.length;
    return (
      <ListView
        horizontal
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
