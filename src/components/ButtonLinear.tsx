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

export default ButtonLinear

const styles = StyleSheet.create({})