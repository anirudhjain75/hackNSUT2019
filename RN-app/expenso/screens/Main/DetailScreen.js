/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text } from 'react-native';
import { styles, Theme } from 'theme';


class DetailsScreen extends React.Component {
  static navigationOptions =({ navigation }) => ({
    title: `${navigation.state.params.data.patientName || ''}`,
    headerStyle: styles.headerStyle,
    headerTintColor: Theme.white,
    headerTitleStyle: {
      fontWeight: 'normal'
    },
  })

  state = {
    errorMessage: null
  }

  render() {
    const data = this.props.navigation.getParam('data', null);
    return (
      <View style={styles.container}>
        <View style={[styles.formikContainer, { paddingTop: 10 }]}>
          <Text style={[styles.errorText, { alignSelf: 'center' }]}>
            {this.state.errorMessage && this.state.errorMessage}
          </Text>
          <Text>
            {
              JSON.stringify(data)
            }
          </Text>
        </View>
      </View>
    );
  }
}

export default DetailsScreen;
