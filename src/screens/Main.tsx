import React, { useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { User } from '@react-native-google-signin/google-signin';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import TasksList from './TasksList';
import DoneTasks from './DoneTasks';
import { TaskProps } from '../components/Task';
import { TasksContext } from '../utils/TaskContext';
import Storage from '../utils/Storage';
import SVGIcon from '../components/SVGIcon';
import imgSrc from '../utils/Images';
import { UserContext } from '../utils/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type Props = {};

const Main: React.FC<Props> = () => {
    const { user, logout } = useContext(UserContext)
    const [tasks, setTasks] = useState<TaskProps[]>([])
    useEffect(() => {
        fetchUserTasks()
    }, [])

    const fetchUserTasks = async () => {
        if (user) {
            try {
                const userTasks = await Storage.getTasks(user.user.id)
                setTasks(userTasks)
            } catch (e) {
                console.log("fetchUserTasks -> e", e)
            }
        }
    }

    const onUpdateTasks = async (newTasks: TaskProps[]) => {
        if (user) {
            try {
                await Storage.setTasks(user.user.id, newTasks)
                setTasks(newTasks)
            } catch (e) {
                console.log("onUpdateTasks -> e", e)
            }
        }
    }

    const getIconColor = (isFocused: Boolean): String => isFocused ? '#0093d1' : 'black'

    const getTabOptions = (route: Route): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
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
            <Tab.Screen name="Tasks" component={TasksList} />
            <Tab.Screen name="Done" component={DoneTasks} />
        </Tab.Navigator>
    )

    const StackNavigatorOptions: StackNavigationOptions = {
        headerRight: (props) => <TouchableOpacity onPress={() => logout()} {...props} >
            <SVGIcon style={s.logoutIcon} source={imgSrc.a_icons_log_out_red} width={25} height={25} />
        </TouchableOpacity>
    }

    return (
        <TasksContext.Provider value={{ tasks, updateTasks: onUpdateTasks }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={StackNavigatorOptions} >
                    <Stack.Screen name="Todo App" component={TabsNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </TasksContext.Provider>
    );
}

const s = StyleSheet.create({
    logoutIcon: {
        marginRight: 10
    }
})

export default Main;