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
      <TouchableOpacity 
          className = 'p-5 absolute left-0 top-0'
          onPress={() => goBack()}>
          <Image
            style={{resizeMode: 'contain', width: 30, height: 30, tintColor: 'orange'}}
            source= {{uri: 'https://i.imgur.com/1RCGweh.png'}}
        />
      </TouchableOpacity>
      <Animatable.Image
        animation="zoomIn"
        className='h-60 w-60'
        source={{uri: 'https://i.imgur.com/W7AJbjR.png'}}
      />
      <Text className='text-[#FF8C00] font-medium text-2xl mt-10 w-80 text-center'>
        Cùng mang thế giới về trong tầm tay
      </Text>
      <Text className='text-black font-base text-base mt-10 w-80 text-center'>
        Chúng tôi không thu phí khi bạn đăng chỗ ở, Nếu chỗ ở của bạn đạt tiêu chuẩn được kiểm duyệt đăng tải trên Pstay, chúng tôi chỉ thu phí khi có booking.
      </Text>
      <TouchableOpacity onPress = {() => navigate('InsideRoute', {screen : ScreensName.OwnerRoute, params: {screen: ScreensName.RegisInfoScreen}}) } className='mt-5 rounded-xl pt-10'>
        <ButtonLinear text={'Trở thành chủ nhà'}/>
      </TouchableOpacity>
    </Container>
    
  )
}

export {BecomeOwnerScreen}

const styles = StyleSheet.create({})