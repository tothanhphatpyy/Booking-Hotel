import React from 'react';
import {RecoilRoot} from 'recoil';
import {Root} from './Root';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export {App};
