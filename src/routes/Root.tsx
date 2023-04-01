import React from 'react';
import {InsideRoute} from './InsideRoute';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailStoriesScreen} from '@src/screens/DetailStories';
import {RootStackScreensParams, ScreensName} from './types';

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
        name={ScreensName.InsideRoute}
        component={InsideRoute}
        options={{headerShown: false}}
      />
      {RootStack.map(item => (
        <RootStackStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </RootStackStack.Navigator>
  );
}

export {Root};
