import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { User } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Tasks from './Tasks';
import DoneTasks from './DoneTasks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type Props = {
    user: User
};

const Main: React.FC<Props> = ({ user }) => {


    const TabsNavigator = () => (
        <Tab.Navigator>
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="Done" component={DoneTasks} />
        </Tab.Navigator>
    )

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Todo App" component={TabsNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});

export default Main;