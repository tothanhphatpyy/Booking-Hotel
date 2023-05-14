import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'
import { Container } from '@src/components/Container';
import * as Animatable from 'react-native-animatable';
import i18n from '@src/ultis/i18n';
import { ButtonLinear } from '@src/components/ButtonLinear';
import { useNavigation } from '@react-navigation/native';

const BecomeOwnerScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.BecomeOwnerScreen>> = () => {
  
  const {navigate} : any = useNavigation();
  return (
    <Container flex={1} background="WHITE" justify="center" align="center">
      <Animatable.Image
        animation="zoomIn"
        className='h-60 w-60'
        source={{uri: 'https://i.imgur.com/nbKakox.png'}}
      />
      <Text className='text-[#FF8C00] font-medium text-2xl mt-10 w-80 text-center'>
        Cùng mang thế giới về trong tầm tay
      </Text>
      <TouchableOpacity onPress = {() => navigate('InsideRoute', {screen : ScreensName.OwnerRoute, params: {screen: ScreensName.RegisHotelScreen}}) } className='mt-5 rounded-xl pt-20'>
        <ButtonLinear text={'Trở thành chủ nhà'}/>
      </TouchableOpacity>
    </Container>
    
  )
}

export {BecomeOwnerScreen}

const styles = StyleSheet.create({})