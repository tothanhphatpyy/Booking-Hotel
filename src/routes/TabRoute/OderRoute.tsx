import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { OderScreen } from '@src/screens/Tab/Oder';
import {OderStackScreensParams, ScreensName} from '../types';

const OderStack =
  createNativeStackNavigator<OderStackScreensParams>();

interface OderNavigatorProps {
  name: typeof ScreensName.OderScreen;
  component: typeof OderScreen;
}
const Oder: OderNavigatorProps[] = [
  {
    name: ScreensName.OderScreen,
    component: OderScreen,
  },
];

const OderRoute = () => {
  return (
    <OderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Oder.map(item => (
        <OderStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </OderStack.Navigator>
  );
};

export {OderRoute};
