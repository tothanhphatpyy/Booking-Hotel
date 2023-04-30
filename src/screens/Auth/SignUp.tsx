import { Text, TouchableOpacity, View, Button } from 'react-native'
import React from 'react';
import {AuthRouteScreenProps, ScreensName} from '@src/routes/types';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen: React.FC<
AuthRouteScreenProps<ScreensName.SignUpScreen>>= () => {

  const { navigate }: any = useNavigation();

  return (
    
    <View className={'flex-1 justify-center items-center'}>
      <Text style={{color: 'black'}}>SignUp</Text>
      <TouchableOpacity style={{marginTop: 30}}>
          <Button 
            title='Sign In' 
            color={'pink'}
            onPress={() => navigate('SignInRoute')} />
      </TouchableOpacity>
    </View>
    
    
  )
}

export {SignUpScreen}
