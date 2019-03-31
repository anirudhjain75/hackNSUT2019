import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Theme, styles } from 'theme';
import { storeItemAsync } from 'api/asyncStore';

const OnboardDoneAsync = async (props, navigateTo) => {
  storeItemAsync('isOnboardDone', 'true');
  props.navigation.navigate(navigateTo);
};

const OnboardingScreen = props => (
  <View
    style={[
      styles.container,
      { justifyContent: 'center' }
    ]}
  >
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          OnboardDoneAsync(props, 'Providers');
        }}
        style={{
          alignItems: 'center',
          backgroundColor: Theme.overlay,
          borderRadius: 4,
          padding: 10,
          marginTop: 10,
          width: '70%'
        }}
      >
        <Text
          style={{ color: Theme.surface, fontSize: 18, fontWeight: 'bold' }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
OnboardingScreen.navigationOptions = {
  header: null
};
export default OnboardingScreen;
