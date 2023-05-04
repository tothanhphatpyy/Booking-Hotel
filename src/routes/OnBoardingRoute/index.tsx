import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensName, OnBoardingStackScreenParams } from '../types';
import { OnBoardingScreen } from '@src/screens/OnBoarding';

const OnBoardingStack = createNativeStackNavigator<OnBoardingStackScreenParams>();
interface OnBoardingNavigatorProps {
  name: any;
  component: any;
  title?: string;
}
const Stack: OnBoardingNavigatorProps[] = [
  {
    name: ScreensName.SignInScreen,
    component: OnBoardingScreen,
    title: 'On Boarding',
  },
]

const OnBoardingRoute = () => {
  return (
  <OnBoardingStack.Navigator screenOptions={{headerShown: false}}>
    {Stack.map(item => (
        <OnBoardingStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
  </OnBoardingStack.Navigator>
  )
}
export { OnBoardingRoute }
