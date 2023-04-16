import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreensName, SignInRouteScreenProps } from '@src/routes/types'

const RegistrationInfoUserScreen: React.FC<SignInRouteScreenProps<ScreensName.RegistrationInfoUserScreen>>= () => {
  return (
    <View>
      <Text>RegistrationInfoUser</Text>
    </View>
  )
}

export { RegistrationInfoUserScreen }

const styles = StyleSheet.create({})