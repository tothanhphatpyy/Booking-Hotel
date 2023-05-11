import { StyleSheet, Text, View } from 'react-native'
import React, {FunctionComponent} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import {LINEAR_COLORS} from '@src/config/theme/colors';

interface LoadingProps {
  text : string;
}

const ButtonLinear: FunctionComponent<LoadingProps> = ({text}) => {
  return (
    <LinearGradient colors={LINEAR_COLORS} className='rounded-xl' start={{x: 0, y: 0.5}} end={{x: 1, y: 1}}>
      <Text className='text-center py-3 text-lg text-white font-semibold'>
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

export  {ButtonLinear, ButtonConfirmLinear}

const styles = StyleSheet.create({})