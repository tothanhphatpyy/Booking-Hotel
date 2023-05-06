import { StyleSheet, Text, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import i18n from '@src/ultis/i18n';
import { OderRouteScreenProps, ScreensName } from '@src/routes/types';
import React from 'react'
import { Container } from '@src/components/Container';

const OderScreen: React.FC<
  OderRouteScreenProps<ScreensName.OderScreen>> = () => {
  
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

export {OderScreen}

const styles = StyleSheet.create({})