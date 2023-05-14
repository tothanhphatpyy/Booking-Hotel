import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'
import { Container } from '@src/components/Container';
import * as Animatable from 'react-native-animatable';
import i18n from '@src/ultis/i18n';

const DashboardOwnerScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.DashboardOwnerScreen>> = () => {
  
  return (
    <Container flex={1} background="WHITE" justify="center" align="center">
      <Animatable.Image
        animation="zoomIn"
        className='h-40 w-40'
        source={require('@src/assets/images/app/logo.png')}
      />
      <Text className='text-[#FF8C00] font-medium text-4xl'>
        {i18n.t('app_name')}
      </Text>
    </Container>
  )
}

export {DashboardOwnerScreen}

const styles = StyleSheet.create({})