import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommunityScreen} from '@src/screens/Community';
import {CommunityStackScreensParams, ScreensName} from '../types';

const CommunityStack =
  createNativeStackNavigator<CommunityStackScreensParams>();

interface CommunityRoute {
  name: typeof ScreensName.CommunityScreen;
  component: typeof CommunityScreen;
}
const Community: CommunityRoute[] = [
  {
    name: ScreensName.CommunityScreen,
    component: CommunityScreen,
  },
];

const CommunityRoute = () => {
  return (
    <CommunityStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Community.map(item => (
        <CommunityStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </CommunityStack.Navigator>
  );
};

export {CommunityRoute};
