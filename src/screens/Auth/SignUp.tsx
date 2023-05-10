import { Text, TouchableOpacity, View, Button, Image, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import {AuthRouteScreenProps, ScreensName} from '@src/routes/types';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useRequest } from 'ahooks';
import { loginApi } from '@src/services/api/UserApi';
import Loading from '@src/components/Loading';
import ButtonLinear from '@src/components/ButtonLinear';
import { useUserInfoState } from '@src/atom/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen: React.FC<
AuthRouteScreenProps<ScreensName.SignUpScreen>>= () => {
  const [userInfo, setUserInfo] = useUserInfoState();
  const { navigate }: any = useNavigation();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const { data, runAsync, loading } = useRequest(async () => 
    loginApi({
      username: userName, 
      password : passWord
    }),{ debounceWait: 300, manual: true});

  const handleLogin = async() => {
    await runAsync().then((res: any) => {
      setUserInfo(user => ({...user, 
        id: res._id, 
        username: res.username,
        name: res.name,
        email: res.email,
        role: res.role,
        status: res.status,
      }))
      AsyncStorage.setItem('user', JSON.stringify(res));
      navigate('TabRoute', {screen : ScreensName.HomeScreen});
    }).catch((error) => {
      console.log(error);
    })
  }
  
  return (
    
    <View className={'flex-1 items-center bg-gray-50'}>
      {loading && <Loading loading={loading}/>}
      <Animatable.Image
        animation="fadeInDown"
        className='object-contain h-2/6 w-full'
        source={require('@src/assets/images/app/logo_cover.png')}
      />
      <Animatable.View className='h-full w-full rounded-t-3xl' animation="fadeInUpBig">
        <Text className='text-2xl ml-5 font-semibold mt-1 text-gray-950'>Đăng Nhập</Text>
        <View className='ml-5 mt-1'>
          <Text className='text-xl text-gray-950 mt-5 text-left font-semibold'>Số điện thoại</Text>
            <TextInput
            value={userName}
            className='text-gray border-gray-400 border-b w-9/12 text-black text-base'
            onChangeText={text => setUserName(text)}
            placeholderTextColor={'gray'}
            placeholder="Nhập số điện thoại của bạn"
            keyboardType="numeric"
            />
            
            <Text className='text-xl text-gray-950 mt-5 font-semibold'>Mật khẩu</Text>
            <TextInput
            value={passWord}
            className='text-gray border-gray-400 border-b w-9/12 text-black text-base'
            onChangeText={text => setPassWord(text)}
            placeholderTextColor={'gray'}
            placeholder="Nhập mật khẩu"
            keyboardType="numeric"
            secureTextEntry={true}
            />

            <TouchableOpacity 
              onPress={() => navigate('AuthRoute', {screen : ScreensName.SignInRoute})}>
              <Text className='text-black text-base ml-44 mt-2 text-right mr-7 font-semibold'>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>


          </View>
          <TouchableOpacity onPress = {() => {handleLogin()} } className='mt-5 rounded-xl mx-5'>
          <ButtonLinear text={'ĐĂNG NHẬP'}/>
          </TouchableOpacity>
          <View className='flex flex-row justify-end mr-7 mt-2'>
              <Text className='text-black text-base'>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity>
                <Text className='text-black ml-1 text-base font-semibold'
                  onPress = {() => navigate('AuthRoute', {screen : ScreensName.SignInRoute})}>
                  Đăng kí ngay
                </Text>
              </TouchableOpacity>     
          </View>

          <View className='items-center mt-5'>
            <Text className='text-black text-base font-semibold'>Hoặc đăng nhập bằng</Text>
            <View className='flex flex-row space-x-10 mt-5'>
              <TouchableOpacity style= {styles.img}>
                <Image
                  className='object-contain h-9 w-9'
                  source={{uri : 'https://i.imgur.com/k9Oo1CW.png'}} //logo Apple
                />
              </TouchableOpacity>
              <TouchableOpacity style= {styles.img}
                onPress={async() => {
                }}>
                <Image
                    className='object-contain h-9 w-9'
                    source={{uri : 'https://i.imgur.com/4JYzqQD.png'}} //logo Google
                  />
              </TouchableOpacity>
              <TouchableOpacity style= {styles.img}>
                <Image
                    className='object-contain h-9 w-9'
                    source={{uri : 'https://i.imgur.com/ID7QQxF.png'}} //logo FB
                  />
              </TouchableOpacity>
            </View>
          </View>
       </Animatable.View>
      
    </View>
    
    
  )
}

export {SignUpScreen}

const styles = StyleSheet.create({

  img : {
    height: '50%',
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#DCDCDC',
    borderRadius : 25,
    padding: 10
  },
})