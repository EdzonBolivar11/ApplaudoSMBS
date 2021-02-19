import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { RootStack } from './src/utils/Types';

//Pages
import Profile from './src/Pages/Profile';

const Stack = createStackNavigator<RootStack>();

const defaultStackSettings = {
  headerMode: 'none',
  cardShadowEnabled: false,
  defaultNavigationOptions: {
    gestureEnabled: true,
  },
};

const Navigation = () => {
  const ref = useRef(null);

  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator initialRouteName="Profile" {...defaultStackSettings}>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
