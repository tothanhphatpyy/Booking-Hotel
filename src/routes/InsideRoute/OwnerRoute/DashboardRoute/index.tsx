import React from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardOwnerStackScreenParams, ScreensName } from '@src/routes/types';
import { HomeOwnerScreen } from '@src/screens/Inside/Owner/Dashboard/Dashboard';
import { CalendarScreen } from '@src/screens/Inside/Owner/Dashboard/Calendar';

const Tab = createBottomTabNavigator<DashboardOwnerStackScreenParams>();

interface TabNavigatorProps {
  name: any;
  component: any;
  title?: string;
  img? : string;
}

const TabNavigator: TabNavigatorProps[] = [
  {
    name: ScreensName.HomeOwnerScreen,
    component: HomeOwnerScreen,
    title: 'Quản lý',
    img: 'https://i.imgur.com/rRWYPtR.png',
  },
  {
    name: ScreensName.CalendarScreen,
    component: CalendarScreen,
    title: 'Lịch đặt phòng',
    img: 'https://i.imgur.com/0zLWkTR.png',
  },
];

const TabOwnerRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarStyle: {
          backgroundColor: '#FFFFFA',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          fontFamily: 'Roboto',
        },
      }}>
      {TabNavigator.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item?.title,
            tabBarIcon: ({ focused }) => (
              <Image
              source={{uri: item?.img}}
              style={{ tintColor: focused? 'orange' : 'gray', marginTop: 5, resizeMode:'contain', width: 25, height: 25}}
              />
            )
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export { TabOwnerRoute };
