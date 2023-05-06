import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScreensName, SettingRouteScreenProps} from '@src/routes/types'
import { Container } from '@src/components/Container';
import * as Animatable from 'react-native-animatable';
import i18n from '@src/ultis/i18n';
import { useUserInfoState } from '@src/atom/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonLinear from '@src/components/ButtonLinear';

const SettingScreen: React.FC<
  SettingRouteScreenProps<ScreensName.SettingScreen>> = () => {
    const [userInfo, setUserInfo] = useUserInfoState();
    const handleLogout =() =>{
      AsyncStorage.clear();
      setUserInfo(user => ({...user, id: '' }))
    }
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
      <TouchableOpacity onPress = {() => {handleLogout()} } className='mt-5 rounded-xl mx-5'>
          <ButtonLinear text={'ĐĂNG XUẤT'}/>
      </TouchableOpacity>
    </Container>
  )
}

export {SettingScreen}

const styles = StyleSheet.create({})