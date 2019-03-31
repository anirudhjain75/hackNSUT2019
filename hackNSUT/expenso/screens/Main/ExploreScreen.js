import React from 'react';

import { View, Text } from 'react-native';

import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import DataList from 'components/cards/DataList';
import { ActivityIndicator, FAB, Portal } from 'react-native-paper';

import { getDataFromFire } from 'api/user';
import TopSearchBar from 'components/bars/TopSearchBar';
import SummaryCard from 'components/SummaryCard';

import { Theme, styles } from 'theme';

class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  state = {
    isLoadingComplete: false,
    isFetching: false,
  };

  onRefresh = () => {
    this.setState({ isFetching: true });
    this.loadResourcesAsync();
  }

  loadResourcesAsync = async () => {
    await getDataFromFire();
    this.setState({ isFetching: false });
  };

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  async componentWillMount() {
    try {
      await this.loadResourcesAsync();
    } catch (err) {
      await this.handleLoadingError(err);
    } finally {
      await this.handleFinishLoading();
    }
  }

  filterData = data => data.filter(item => item.attended === false);

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const { data, navigation } = this.props;
      return (
        <View style={{ padding: 0, margin: 0, flex: 1 }}>

          <TopSearchBar title="" data={data} navigation={navigation} />
          <SummaryCard />
          <DataList
            data={this.filterData(data)}
            navigation={navigation}
            // inverted
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            noRecordsmessage="No Records Yet."
          />
          <FabList
            navigate={this.props.navigation.navigate}
            onRefresh={this.onRefresh}
          />
        </View>
      );
    }
  }
}

const FabComponent = props => (
  <FAB
    style={styles.fab}
    icon="add"
    label="Add Transaction"
    onPress={
      () => {
        props.navigate('Appointment', {
          onNavigateBack: props.onRefresh
        });
      }}
  />
);

class FabList extends React.Component {
  state = {
    open: false,
  };

  render() {
    return (
      <Portal>
        <FAB.Group
          style={{
            paddingBottom: 60,
          }}
          theme={{
            colors: {
              primary: Theme.blue,
              accent: Theme.accent,
              background: Theme.background,
              surface: Theme.surface,
              text: Theme.text,
              error: Theme.red,
              disabled: Theme.disabled,
              placeholder: Theme.placeholder,
              backdrop: Theme.backdrop
            }
          }}
          fabStyle={{ backgroundColor: Theme.blue }}
          open={this.state.open}
          icon={this.state.open ? 'today' : 'add'}
          actions={[
            { icon: 'add', onPress: () => console.log('Pressed add') },
            {
              icon: 'star',
              label: 'Expenses',
              onPress: () => {
                this.props.navigate('Expenses', {
                  onNavigateBack: this.props.onRefresh
                });
              }
            },
            {
              icon: 'multiline-chart',
              label: 'Gains',
              onPress: () => {
                this.props.navigate('Gains', {
                  onNavigateBack: this.props.onRefresh
                });
              }
            },
          ]}
          onStateChange={({ open }) => this.setState({ open })}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps)(ExploreScreen);
