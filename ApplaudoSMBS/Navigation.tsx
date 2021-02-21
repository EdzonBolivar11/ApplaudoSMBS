import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Pages
import Profile from './src/Pages/Profile';
import Home from './src/Pages/Home';
import Search from './src/Pages/Search';
import Favorites from './src/Pages/Favorites';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const ref = useRef(null);

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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
