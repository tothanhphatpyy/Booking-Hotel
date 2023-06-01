import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensName, OwnerStackScreenParams } from '../../types';
import { BecomeOwnerScreen } from '@src/screens/Inside/Owner/BecomeOwner';
import { RegisHotelScreen } from '@src/screens/Inside/Owner/RegisHotel';
import { RegisInfoScreen } from '@src/screens/Inside/Owner/RegisInfo';
import { RegisConfirmScreen } from '@src/screens/Inside/Owner/ConfirmRegis';
import { TabOwnerRoute } from './DashboardRoute';
import { CalendarOfRoomScreen } from '@src/screens/Inside/Owner/Dashboard/CalendarOfRoom';

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
    name: ScreensName.RegisInfoScreen,
    component: RegisInfoScreen,
    title: 'Regis Info',
  },
  {
    name: ScreensName.RegisHotelScreen,
    component: RegisHotelScreen,
    title: 'Regis Hotel',
  },
  {
    name: ScreensName.RegisConfirmScreen,
    component: RegisConfirmScreen,
    title: 'Regis Confirm',
  },
  {
    name: ScreensName.TabOwnerRoute,
    component: TabOwnerRoute,
    title: 'Dashboard Owner Tab',
  },
  {
    name: ScreensName.CalendarOfRoomScreen,
    component: CalendarOfRoomScreen,
    title: 'Calendar of Room',
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