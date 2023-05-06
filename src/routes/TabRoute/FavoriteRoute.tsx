import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreensName, FavoriteStackScreensParams} from '../types';
import { FavoriteScreen } from '@src/screens/Tab/Favorite';

const SearchStack = createNativeStackNavigator<FavoriteStackScreensParams>();

interface FavoriteNavigatorProps {
  name: typeof ScreensName.FavoriteScreen;
  component: typeof FavoriteScreen;
}
const Search: FavoriteNavigatorProps[] = [
  {
    name: ScreensName.FavoriteScreen,
    component: FavoriteScreen,
  },
];

const FavoriteRoute = () => {
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

export {FavoriteRoute};
