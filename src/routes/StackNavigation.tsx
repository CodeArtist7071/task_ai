import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Sidescreen from '../pages/Sidescreen';
import Mainscreen from '../pages/Mainscreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import { View } from 'react-native';
import { Menu } from 'lucide-react-native';
import { gray } from '../constants/colors';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mainscreen" component={Mainscreen} options={{ title: '', headerTransparent:true }} />
        <Stack.Screen name="Sidescreen" component={Sidescreen} options={{ title: '',headerTransparent:true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
