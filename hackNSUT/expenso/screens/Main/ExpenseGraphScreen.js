import React from 'react';

import { View, Text, ImageBackground, Image, Dimensions } from 'react-native';

import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';

import DataList from 'components/cards/DataList';
import { ActivityIndicator, FAB } from 'react-native-paper';

import { getDataFromFire } from 'api/user';
import TopSearchBar from 'components/bars/TopSearchBar';
import { Theme, styles } from 'theme';

class GraphScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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

  filterData = data => data.filter(item => item.attended !== false);

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
        <View style={{ padding: 0, margin: 0, flex: 1, backgroundColor: Theme.background }}>
          <View>
            <Text>
              Bezier Line Chart
            </Text>
            <LineChart
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }]
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const FabComponent = props => (
  <FAB
    style={styles.fab}
    icon="add"
    onPress={
      () => {
        props.navigate('Appointment', {
          onNavigateBack: props.onRefresh
        });
      }}
  />
);

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps)(GraphScreen);
