import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, Home, Post } from '../pages';

const Stack = createStackNavigator();
function Router () {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown: false
            }} />
            <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
                headerShown: false
            }} />
            <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false
            }} />

            <Stack.Screen
            name="Post"
            component={Post}
            options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}

export default Router;