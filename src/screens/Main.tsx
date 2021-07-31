import React, { useState, useEffect } from 'react';
import { User } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TasksList from './TasksList';
import DoneTasks from './DoneTasks';
import { TaskProps } from '../components/Task';
import { TasksContext } from '../utils/TaskContext';
import Storage from '../utils/Storage';

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
            setTasks(userTasks)
        } catch (e) {
            console.log("fetchUserTasks -> e", e)
        }
    }

    const onUpdateTasks = async (newTasks: TaskProps[]) => {
        try {
            await Storage.setTasks(user.user.id, newTasks)
            setTasks(newTasks)
        } catch(e) {

        }
    }

    const TabsNavigator = () => (
        <Tab.Navigator>
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