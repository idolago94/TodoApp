import React, { useState, useEffect } from 'react';
import { User } from '@react-native-google-signin/google-signin';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TasksList from './TasksList';
import DoneTasks from './DoneTasks';
import { TaskProps } from '../components/Task';
import { TasksContext } from '../utils/TaskContext';
import Storage from '../utils/Storage';
import SVGIcon from '../components/SVGIcon';
import imgSrc from '../utils/Images';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type Props = {
    user: User
};

const Main: React.FC<Props> = ({ user }) => {
    const [tasks, setTasks] = useState<TaskProps[]>([])
    useEffect(() => {
        fetchUserTasks()
    }, [])

    const fetchUserTasks = async () => {
        try {
            const userTasks = await Storage.getTasks(user.user.id)
            console.log("fetchUserTasks -> userTasks", userTasks)
            setTasks(userTasks)
        } catch (e) {
            console.log("fetchUserTasks -> e", e)
        }
    }

    const onUpdateTasks = async (newTasks: TaskProps[]) => {
        try {
            await Storage.setTasks(user.user.id, newTasks)
            setTasks(newTasks)
        } catch (e) {

        }
    }

    const getIconColor = (isFocused: Boolean): String => isFocused ? '#0093d1' : 'black'

    const getTabOptions = (route: Route): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
            console.log("route", route.name)
            switch (route.name) {
                case 'Tasks': return <SVGIcon fill={getIconColor(focused)} source={imgSrc.a_icons_edit_black_enabled} height={20} width={20} />
                case 'Done': return <SVGIcon fill={getIconColor(focused)} source={imgSrc.a_icon_success} height={20} width={20} />
                default: return <SVGIcon fill={getIconColor(focused)} source={imgSrc.a_icons_edit_black_enabled} height={20} width={20} />
            }
        }
    })

    const TabsNavigator = () => (
        <Tab.Navigator
            screenOptions={({ route }) => getTabOptions(route)}
        >
            <Tab.Screen name="Tasks">{props => <TasksList user={user} {...props} />}</Tab.Screen>
            <Tab.Screen name="Done" component={DoneTasks} />
        </Tab.Navigator>
    )

    return (
        <TasksContext.Provider value={{ tasks, updateTasks: onUpdateTasks }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Todo App" component={TabsNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </TasksContext.Provider>
    );
}

export default Main;