import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensName, AuthStackScreenParams } from '../types';
import { SignUpScreen } from '@src/screens/Auth/SignUp';
import { SignInRoute } from './SignInRoute';

const AuthStack = createNativeStackNavigator<AuthStackScreenParams>();

interface AuthNavigatorProps {
  name: any;
  component: any;
  title?: string;
}
const Stack: AuthNavigatorProps[] = [
  {
    name: ScreensName.SignUpScreen,
    component: SignUpScreen,
    title: 'SignUp Screen',
  },
  {
    name: ScreensName.SignInRoute,
    component: SignInRoute,
    title: 'SignIn Route',
  },
]

const AuthRoute = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {Stack.map(item => (
        <AuthStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </AuthStack.Navigator>
  )
}

export {AuthRoute}

const styles = StyleSheet.create({})