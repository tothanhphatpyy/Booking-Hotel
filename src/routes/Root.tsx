import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackScreensParams, ScreensName} from './types';
import { OnBoardingRoute } from './OnBoardingRoute';
import { AuthRoute } from './AuthRoute';
import { TabRoute } from './TabRoute';

const RootStack = createNativeStackNavigator<RootStackScreensParams>();

function Root() {
  return (
    
    <RootStack.Navigator>
      <RootStack.Screen
        name={ScreensName.OnBoardingRoute}
        component={OnBoardingRoute}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name= {ScreensName.AuthRoute}
        component={ AuthRoute }
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name= {ScreensName.TabRoute}
        component={ TabRoute }
        options={{headerShown: false}}
      />
      
    </RootStack.Navigator>
    
  );
}

export {Root};
