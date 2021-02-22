import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

//Pages
import Profile from './src/Pages/Profile';
import Home from './src/Pages/Home';
import Search from './src/Pages/Search';
import Favorites from './src/Pages/Favorites';
import DetailsSerie from './src/Pages/Series/DetailSerie';

const Tab = createBottomTabNavigator();

const configAnimation = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Navigation = () => {
  const ref = useRef(null);

  const HomeStack = createStackNavigator();
  const HomeStackScreen = () => (
    <HomeStack.Navigator
      initialRouteName="Home"
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: configAnimation,
          close: configAnimation,
        },
        animationEnabled: true,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="DetailsSerie"
        component={DetailsSerie}
        initialParams={{item: {}}}
      />
    </HomeStack.Navigator>
  );

  const SearchStack = createStackNavigator();
  const SearchStackScreen = () => (
    <SearchStack.Navigator initialRouteName="Search" headerMode="none">
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen
        name="DetailsSerie"
        component={DetailsSerie}
        initialParams={{item: {}}}
      />
    </SearchStack.Navigator>
  );

  const FavoritesStack = createStackNavigator();
  const FavoritesStackScreen = () => (
    <FavoritesStack.Navigator initialRouteName="Favorites" headerMode="none">
      <FavoritesStack.Screen name="Favorites" component={Favorites} />
      <FavoritesStack.Screen
        name="DetailsSerie"
        component={DetailsSerie}
        initialParams={{item: {}}}
      />
    </FavoritesStack.Navigator>
  );

  const GetIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName;
    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Profile':
        iconName = focused ? 'ios-list-sharp' : 'ios-list-outline';
        break;
      case 'Search':
        iconName = focused ? 'search' : 'search-outline';
        break;
      case 'Favorites':
        iconName = focused ? 'heart-sharp' : 'heart-outline';
        break;
      default:
        iconName = '';
        break;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <NavigationContainer ref={ref}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) =>
            GetIcon(route, focused, color, size),
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
