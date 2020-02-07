import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/register/_Register';

import * as COLORS from '../assets/styles/colors'

const Stack = createStackNavigator();
export default function RootNavigator() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Register" component={Register} options={{
            title: 'Register',
            headerStyle: {
              backgroundColor: COLORS.purple,
            },
            headerTintColor: '',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}