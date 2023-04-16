import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookshelfRoute} from './BookshelfRoute';
import {CommunityRoute} from './CommunityRoute';
import {HomeRoute} from './HomeRoute';
import {SearchRoute} from './SearchRoot';
import {SettingRoute} from './SettingRoute';
import {ScreensName, TabStackScreenParams} from '../types';

const Tab = createBottomTabNavigator<TabStackScreenParams>();

interface TabNavigatorProps {
  name: any;
  component: any;
  title?: string;
}

const TabNavigator: TabNavigatorProps[] = [
  {
    name: ScreensName.HomeRoute,
    component: HomeRoute,
    title: 'Home',
  },
  {
    name: ScreensName.SearchRoute,
    component: SearchRoute,
    title: 'Tìm kiếm',
  },
  {
    name: ScreensName.BookshelfRoute,
    component: BookshelfRoute,
    title: 'Kệ sách',
  },
  {
    name: ScreensName.CommunityRoute,
    component: CommunityRoute,
    title: 'Cộng đồng',
  },
  {
    name: ScreensName.SettingRoute,
    component: SettingRoute,
    title: 'Cài đặt',
  },
];

const TabRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {TabNavigator.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item?.title,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export { TabRoute };
