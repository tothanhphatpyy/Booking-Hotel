import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackScreensParams, ScreensName} from './types';
import { OnBoardingRoute } from './OnBoardingRoute';
import { AuthRoute } from './AuthRoute';
import { TabRoute } from './TabRoute';
import { InsideRoute } from './InsideRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserInfoState } from '@src/atom/user';
import { checkRole } from '@src/config/auth';

const RootStack = createNativeStackNavigator<RootStackScreensParams>();

function Root() {
  const [userInfo, setUserInfo] = useUserInfoState();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const isLoggedIn = async() => {
      try {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        const user = JSON.parse(await AsyncStorage.getItem('user') as string);
        if(user){
          setUserInfo(userInfo => ({...userInfo, 
            id: user._id, 
            username: user.username,
            name: user.name,
            email: user.email,
            role: checkRole(user.role),
            status: user.status,
          }))
        }
        
      } catch (e: any) {
        console.log(`isLoggedIn: ${e.message}`);
      }
    }
  isLoggedIn();
  },[]);
  
  return (

    <RootStack.Navigator>
      {loading &&
        <RootStack.Screen
          name={ScreensName.OnBoardingRoute}
          component={OnBoardingRoute}
          options={{headerShown: false}}
        />
      }
      {!userInfo.id ?
      <RootStack.Screen
        name= {ScreensName.AuthRoute}
        component={ AuthRoute }
        options={{headerShown: false}}
      />
      :
      <RootStack.Screen
        name= {ScreensName.TabRoute}
        component={ TabRoute }
        options={{headerShown: false}}
      />
      }
      <RootStack.Screen
        name= {ScreensName.InsideRoute}
        component={ InsideRoute }
        options={{headerShown: false}}
      />
    </RootStack.Navigator>

  );
}

export {Root};
