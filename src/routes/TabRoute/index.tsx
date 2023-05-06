import React from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OderRoute } from './OderRoute';
import { ChatRoute } from './ChatRoute';
import { HomeRoute } from './HomeRoute';
import { FavoriteRoute } from './FavoriteRoute';
import { SettingRoute } from './SettingRoute';
import { ScreensName, TabStackScreenParams } from '../types';

const Tab = createBottomTabNavigator<TabStackScreenParams>();

interface TabNavigatorProps {
  name: any;
  component: any;
  title?: string;
  img? : string;
}

const TabNavigator: TabNavigatorProps[] = [
  {
    name: ScreensName.HomeRoute,
    component: HomeRoute,
    title: 'Trang chủ',
    img: 'https://i.imgur.com/rRWYPtR.png',
  },
  {
    name: ScreensName.FavoriteRoute,
    component: FavoriteRoute,
    title: 'Yêu thích',
    img: 'https://i.imgur.com/u2XSpbI.png',
  },
  {
    name: ScreensName.OderRoute,
    component: OderRoute,
    title: 'Đặt chỗ của tôi',
    img: 'https://i.imgur.com/PvW42Jd.png',
  },
  {
    name: ScreensName.ChatRoute,
    component: ChatRoute,
    title: 'Tin nhắn',
    img: 'https://i.imgur.com/SACmELL.png',
  },
  {
    name: ScreensName.SettingRoute,
    component: SettingRoute,
    title: 'Cài đặt',
    img: 'https://i.imgur.com/7lzGup8.png',
  },
];

const TabRoute = () => {
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

export { TabRoute };
