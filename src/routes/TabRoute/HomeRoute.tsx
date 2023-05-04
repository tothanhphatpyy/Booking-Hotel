import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from '@src/screens/Tab/Home';
import {HomeStackScreensParams, ScreensName} from '../types';

const HomeStack = createNativeStackNavigator<HomeStackScreensParams>();

interface HomeRoute {
  name: typeof ScreensName.HomeScreen;
  component: typeof HomeScreen;
}
const Home: HomeRoute[] = [
  {
    name: ScreensName.HomeScreen,
    component: HomeScreen,
  },
];

const HomeRoute = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Home.map(item => (
        <HomeStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </HomeStack.Navigator>
  );
};

export {HomeRoute};
