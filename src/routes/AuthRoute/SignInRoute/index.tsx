import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreensName, SignInStackScreenParams } from '@src/routes/types';
import { SignInScreen } from '@src/screens/Auth/SignIn';
import { OtpPhoneScreen } from '@src/screens/Auth/SignIn/OtpPhone';
import { ConfirmPasswordScreen } from '@src/screens/Auth/SignIn/ConfirmPassword';
import { RegistrationInfoUserScreen } from '@src/screens/Auth/SignIn/RegistrationInfoUser';

const SignInStack = createNativeStackNavigator<SignInStackScreenParams>();

interface SignInNavigatorProps {
  name: any;
  component: any;
  title?: string;
}
const Stack: SignInNavigatorProps[] = [
  {
    name: ScreensName.SignInScreen,
    component: SignInScreen,
    title: 'Regis Phone',
  },
  {
    name: ScreensName.OtpPhoneScreen,
    component: OtpPhoneScreen,
    title: 'OTP Phone',
  },
  {
    name: ScreensName.ConfirmPasswordScreen,
    component: ConfirmPasswordScreen,
    title: 'Confirm password screen',
  },
  {
    name: ScreensName.RegistrationInfoUserScreen,
    component: RegistrationInfoUserScreen,
    title: 'Registration info user screen',
  }
    

]

const SignInRoute = () => {
  return (
    <SignInStack.Navigator screenOptions={{headerShown: false}}>
      {Stack.map(item => (
        <SignInStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </SignInStack.Navigator>
  )
}

export { SignInRoute }

const styles = StyleSheet.create({})