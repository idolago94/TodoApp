import React, { useEffect, useState } from 'react';
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
            <Tab.Screen name="Tasks">{props => <Tasks user={user} tasks={[]} {...props} />}</Tab.Screen>
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

export default Main;