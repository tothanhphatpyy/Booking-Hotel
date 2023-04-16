import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailStoriesScreen} from '@src/screens/DetailStories';
import {RootStackScreensParams, ScreensName} from './types';
import { AuthRoute } from './AuthRoute';
import { TabRoute } from './TabRoute';

const RootStackStack = createNativeStackNavigator<RootStackScreensParams>();

interface BookshelfRoute {
  name: typeof ScreensName.DetailStoriesScreen;
  component: typeof DetailStoriesScreen;
}
const RootStack: BookshelfRoute[] = [
  {
    name: ScreensName.DetailStoriesScreen,
    component: DetailStoriesScreen,
  },

];

function Root() {
  return (
    
    <RootStackStack.Navigator>
      <RootStackStack.Screen
        name= {ScreensName.AuthRoute}
        component={ AuthRoute }
        options={{headerShown: false}}
      />
      <RootStackStack.Screen
        name= {ScreensName.TabRoute}
        component={ TabRoute }
        options={{headerShown: false}}
      />
      
    </RootStackStack.Navigator>
    
  );
}

export {Root};
