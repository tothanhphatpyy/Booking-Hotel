import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookshelfScreen} from '@src/screens/Bookshelf';
import {BookshelfStackScreensParams, ScreensName} from '../types';

const BookshelfStack =
  createNativeStackNavigator<BookshelfStackScreensParams>();

interface BookshelfRoute {
  name: typeof ScreensName.BookshelfScreen;
  component: typeof BookshelfScreen;
}
const Bookshelf: BookshelfRoute[] = [
  {
    name: ScreensName.BookshelfScreen,
    component: BookshelfScreen,
  },
];

const BookshelfRoute = () => {
  return (
    <BookshelfStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Bookshelf.map(item => (
        <BookshelfStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </BookshelfStack.Navigator>
  );
};

export {BookshelfRoute};
