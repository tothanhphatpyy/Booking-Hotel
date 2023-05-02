import { StyleSheet, Text, View } from 'react-native'
import React, {FunctionComponent} from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib';

interface LoadingProps {
  loading : boolean;
}

const Loading: FunctionComponent<LoadingProps> = ({loading }) => {
  return (
    <Spinner
      visible={loading}
      textContent={'Loading...'}
      textStyle={{color: 'orange'}}
      animation={'fade'}
    />
  )
}

export default Loading

const styles = StyleSheet.create({})