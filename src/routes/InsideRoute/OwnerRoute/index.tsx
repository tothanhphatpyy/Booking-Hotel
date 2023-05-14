import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensName, OwnerStackScreenParams } from '../../types';
import { BecomeOwnerScreen } from '@src/screens/Inside/Owner/BecomeOwner';
import { RegisHotelScreen } from '@src/screens/Inside/Owner/RegisHotel';
import { DashboardOwnerScreen } from '@src/screens/Inside/Owner/Dashboard';

const OwnerStack = createNativeStackNavigator<OwnerStackScreenParams>();
interface OnBoardingNavigatorProps {
  name: any;
  component: any;
  title?: string;
}
const Stack: OnBoardingNavigatorProps[] = [
  {
    name: ScreensName.BecomeOwnerScreen,
    component: BecomeOwnerScreen,
    title: 'Become Owner',
  },
  {
    name: ScreensName.RegisHotelScreen,
    component: RegisHotelScreen,
    title: 'Regis Hotel',
  },
  {
    name: ScreensName.DashboardOwnerScreen,
    component: DashboardOwnerScreen,
    title: 'Dashboard Owner',
  },
]

const OwnerRoute = () => {
  return (
  <OwnerStack.Navigator screenOptions={{headerShown: false}}>
    {Stack.map(item => (
      <OwnerStack.Screen
        key={item.name}
        name={item.name}
        component={item.component}
      />
      ))}
  </OwnerStack.Navigator>
  )
}
export { OwnerRoute }