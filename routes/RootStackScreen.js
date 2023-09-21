import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/splash';
import Login from '../screens/login';
import Register from '../screens/register';
import ResetPassword from '../screens/reset';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="Register" component={Register}/>
        <RootStack.Screen name="ResetPassword" component={ResetPassword}/>
    </RootStack.Navigator>
);

export default RootStackScreen;