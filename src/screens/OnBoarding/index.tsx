import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect} from 'react'
import { ScreensName, OnBoardingRouteScreenProps, AuthRouteScreenProps} from '@src/routes/types'
import { Container } from '@src/components/Container';
import { useNavigation } from '@react-navigation/native';
import i18n from '@src/ultis/i18n';

const OnBoardingScreen: React.FC<
  OnBoardingRouteScreenProps<ScreensName.OnBoardingScreen>> = () => {
  
  const { navigate }: any  = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      const StackRoute = ScreensName.AuthRoute;
      const SignUpScreen = ScreensName.SignUpScreen;
      navigate( StackRoute, {screen: SignUpScreen });
    }, 2000);
  }, []);

  return (
    <Container flex={1} background="WHITE" justify="center" align="center">
      <Image
        className='h-40 w-40'
        source={require('@src/assets/images/logo.png')}
      />
      <Text className='text-[#FF8C00] font-medium text-4xl'>
        {i18n.t('app_name')}
      </Text>
    </Container>
  )
}

export {OnBoardingScreen}

const styles = StyleSheet.create({})