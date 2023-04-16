import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchScreen} from '@src/screens/Search';
import {ScreensName, SearchStackScreensParams} from '../types';

const SearchStack = createNativeStackNavigator<SearchStackScreensParams>();

interface SearchRoute {
  name: typeof ScreensName.SearchScreen;
  component: typeof SearchScreen;
}
const Search: SearchRoute[] = [
  {
    name: ScreensName.SearchScreen,
    component: SearchScreen,
  },
];

const SearchRoute = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Search.map(item => (
        <SearchStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </SearchStack.Navigator>
  );
};

export {SearchRoute};
