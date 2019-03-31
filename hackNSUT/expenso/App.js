import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';

import NavigationService from 'utils/NavigationService';
import { PersistGate } from 'redux-persist/integration/react';
import { styles, Theme, papertheme } from 'theme/index';

import ignoreWarnings from 'react-native-ignore-warnings';
import store, { persistor } from './redux/store';

import AppNavigator from './navigation/AppNavigator';

ignoreWarnings('Setting a timer');


export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor={Theme.statusbar}
            barStyle={Theme.barStyle}
          />
          <View style={styles.statusBar} />
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PaperProvider theme={papertheme}>
                <AppNavigator
                  ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                />
              </PaperProvider>
            </PersistGate>
          </Provider>
        </View>
      );
    }
  }

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('assets/images/robot-dev.png'),
      require('assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('assets/fonts/SpaceMono-Regular.ttf')
    })
  ]);

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
