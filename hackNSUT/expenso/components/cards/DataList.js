import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import DataCard from './DataCard';

const DataList = props => (
  <FlatList
    {...props}
    renderItem={({ item }) => <DataCard data={item} navigation={props.navigation} />}
      // eslint-disable-next-line no-unused-vars
    keyExtractor={(item, index) => index.toString()}
    ListHeaderComponent={() => (!props.data || props.data.length === 0
      ? <Text style={styles.emptyMessageStyle}>{props.noRecordsmessage}</Text>
      : null)
      }
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyMessageStyle: {
    textAlign: 'center',
    // My current hack to center it vertically
    // Which does not work as expected
    marginTop: '50%',
  }
});

export default DataList;
