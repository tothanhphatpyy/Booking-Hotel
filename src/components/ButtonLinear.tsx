import { StyleSheet, Text, View, Image } from 'react-native'
import React, {FunctionComponent} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import {LINEAR_COLORS} from '@src/config/theme/colors';

interface LoadingProps {
  text : string;
}

const ButtonLinear: FunctionComponent<LoadingProps> = ({text}) => {
  return (
    <LinearGradient colors={LINEAR_COLORS} className='rounded-xl px-10' start={{x: 0, y: 0.5}} end={{x: 1, y: 1}}>
      <Text className='text-center py-3 text-lg text-white font-semibold'>
        {text}
      </Text>
    </LinearGradient>
  )
}

const ButtonLinearSizeSM: FunctionComponent<LoadingProps> = ({text}) => {
  return (
    <LinearGradient colors={LINEAR_COLORS} className='rounded-xl px-3' start={{x: 0, y: 0.5}} end={{x: 1, y: 1}}>
      <Text className='text-center py-3 text-sm text-white font-semibold'>
        {text}
      </Text>
    </LinearGradient>
  )
}

const ButtonConfirmLinear: FunctionComponent<LoadingProps> = ({text}) => {
  return (
    <LinearGradient
      colors={['#F08080', '#FF6347', '#FF4500']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      
      style={{alignItems: 'center', marginHorizontal: 20, paddingVertical: 12, 
              paddingHorizontal: 20, borderRadius: 10, marginTop: 20,}}>
      <Text style={{ fontSize: 15, fontWeight:'bold', color: 'white', paddingHorizontal: 20, paddingVertical: 0}}
        >{text}</Text>
    </LinearGradient> 
  )
}

const ButtonLinearGray: FunctionComponent<LoadingProps> = ({text}) => {
  return (
    <LinearGradient
      colors={['#F9BD4B', '#F9BD4B', '#F9BD4B']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      
      style={{alignItems: 'center', paddingVertical: 5, marginTop: 5, flexDirection: 'row',
              paddingHorizontal: 10, borderRadius: 20,}}>
      <Image
        style={{resizeMode: 'contain', width: 30, height: 30}}
        source= {{uri: 'https://i.imgur.com/GvAuhUx.png'}}/>
      <Text style={{ fontSize: 14.5, fontWeight:'400', color: 'white', paddingHorizontal: 10, marginLeft: -5}}
        >{text}</Text>
    </LinearGradient> 
  )
}

export  {ButtonLinear, ButtonConfirmLinear, ButtonLinearSizeSM, ButtonLinearGray}

const styles = StyleSheet.create({})