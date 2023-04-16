import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreensName, SignInRouteScreenProps } from '@src/routes/types'

const OtpPhoneScreen:React.FC<
  SignInRouteScreenProps<ScreensName.OtpPhoneScreen>>= () => {
    
  return (
    <View>
      <Text>RegisterPhone</Text>
    </View>
  )
}

export { OtpPhoneScreen }

const styles = StyleSheet.create({})