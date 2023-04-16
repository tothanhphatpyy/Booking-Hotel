import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreensName, SignInRouteScreenProps } from '@src/routes/types'

const ConfirmPasswordScreen:React.FC<
  SignInRouteScreenProps<ScreensName.ConfirmPasswordScreen>>= () => {

  return (
    <View>
      <Text>RegisterPhone</Text>
    </View>
  )
}

export { ConfirmPasswordScreen }

const styles = StyleSheet.create({})