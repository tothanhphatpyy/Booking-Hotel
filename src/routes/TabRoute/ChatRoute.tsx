import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ChatScreen } from '@src/screens/Tab/Inbox';
import {ChatStackScreensParams, ScreensName} from '../types';

const ChatStack =
  createNativeStackNavigator<ChatStackScreensParams>();

interface ChatNavigatorProps {
  name: typeof ScreensName.ChatScreen;
  component: typeof ChatScreen;
}
const Chat: ChatNavigatorProps[] = [
  {
    name: ScreensName.ChatScreen,
    component: ChatScreen,
  },
];

const ChatRoute = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Chat.map(item => (
        <ChatStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </ChatStack.Navigator>
  );
};

export {ChatRoute};
