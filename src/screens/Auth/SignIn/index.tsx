import { StyleSheet, Text, View } from 'react-native'
import { ScreensName, AuthRouteScreenProps, SignInRouteScreenProps } from '@src/routes/types'
import React from 'react'

const SignInScreen: React.FC<
  SignInRouteScreenProps<ScreensName.SignInScreen>>= () => {
  return (
    <View>
      <Text style={{color: 'black'}}>SignIn</Text>
    </View>
  )
}

export {SignInScreen}

const styles = StyleSheet.create({})