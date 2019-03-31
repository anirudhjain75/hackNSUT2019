import React from 'react';
import { View, TouchableOpacity, } from 'react-native';

import { AppLoading } from 'expo';

import { SearchBar, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import { Theme } from 'theme';
import DataList from 'components/cards/DataList';
import { ActivityIndicator } from 'react-native-paper';
import TabBarIcon from 'components/icons/TabBarIcon';

const TopSearchBar = props => (
  <View style={{ flexDirection: 'row', backgroundColor: Theme.statusbar }}>
    <TouchableOpacity
      onPress={() => {
        props.navigation.goBack();
      }}
      style={
        {
          padding: 10
        }
      }
    >
      <TabBarIcon
        name="md-arrow-back"
        size={props.iconsize || 28}
      />
    </TouchableOpacity>
    <SearchBar
      autoFocus
      autoCapitalize="none"
      containerStyle={{
        backgroundColor: Theme.statusbar,
        padding: 4,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flex: 1
      }}
      inputContainerStyle={{
        backgroundColor: Theme.statusbar
      }}
      searchIcon={null}
      placeholder="Search"
      onChangeText={props.updateSearch}
      value={props.search}
    />
  </View>
);

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    search: '',
    isFetching: false
  };

  filterData = data => data.filter((item) => {
    let temp = 0;
    if (item.mobile) temp += item.mobile.toLowerCase().includes(this.state.search);
    if (item.patientName) temp += item.patientName.toLowerCase().includes(this.state.search);
    if (item.email) temp += item.email.toLowerCase().includes(this.state.search);
    if (item.patientDiagnosis) {
      temp += item.patientDiagnosis.toLowerCase().includes(this.state.search);
    }
    return temp !== 0;
  });

  updateSearch = (search) => {
    this.setState({ search: search.toLowerCase() });
  };

  onRefresh = () => {
  }

  render() {
    const { navigation, data } = this.props;
    return (
      <View>
        <TopSearchBar
          navigation={navigation}
          search={this.state.search}
          updateSearch={this.updateSearch}
        />
        {!this.state.search ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100
          }}
          >
            <Text>Search records.</Text>
          </View>
        ) : (
          <View>
            {data && (

              <DataList
                data={this.filterData(data)}
                navigation={navigation}
                  // inverted
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                noRecordsmessage="No such record exists."
              />
            ) }
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps)(SearchScreen);
