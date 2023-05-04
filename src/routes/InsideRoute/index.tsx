import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensName, InsideStackScreenParams } from '../types';
import { RoomOfLocationScreen } from '@src/screens/Inside/Home_tab/RoomOfLocation';

const InsideStack = createNativeStackNavigator<InsideStackScreenParams>();
interface OnBoardingNavigatorProps {
  name: any;
  component: any;
  title?: string;
}
const Stack: OnBoardingNavigatorProps[] = [
  {
    name: ScreensName.RoomOfLocationScreen,
    component: RoomOfLocationScreen,
    title: 'Room Of Location',
  },
]

const InsideRoute = () => {
  return (
  <InsideStack.Navigator screenOptions={{headerShown: false}}>
    {Stack.map(item => (
      <InsideStack.Screen
        key={item.name}
        name={item.name}
        component={item.component}
      />
      ))}
  </InsideStack.Navigator>
  )
}
export { InsideRoute }