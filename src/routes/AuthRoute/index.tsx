import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensName, AuthStackScreenParams } from '../types';
import { SignUpScreen } from '@src/screens/Auth/SignUp'
import { SignInRoute } from './SignInRoute';

const AuthStack = createNativeStackNavigator<AuthStackScreenParams>();

const AuthRoute = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name={ScreensName.SignUpScreen}
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen 
        name={ScreensName.SignInRoute}
        component={SignInRoute}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  )
}

export {AuthRoute}

const styles = StyleSheet.create({})