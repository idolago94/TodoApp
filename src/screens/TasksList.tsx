import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { User } from '@react-native-google-signin/google-signin';
import Task from '../components/Task';
import AddTaskModal from '../components/AddTaskModal';
import { TasksContext } from '../utils/TaskContext';

type Props = {
    user: User
};

const TasksList: React.FC<Props> = ({ user }) => {
    const { tasks } = useContext(TasksContext)

    const WelcomeMessage = () => (
        <View style={s.userInfo}>
            <Image style={s.avatar} source={{ uri: user.user.photo || undefined }} />
            <Text style={s.userInfoText}>Welcome {user.user.name}</Text>
        </View>
    )

    const NoTasks = () => (
        <View style={[s.container, s.center]}>
            <Text style={s.noTasksMessage}>No Tasks Available</Text>
        </View>
    )

    return (
        <View style={s.container}>
            <WelcomeMessage />
            {tasks.filter(t => !t.isDone).length > 0 ?
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => !item.isDone ? <Task index={index} {...item} /> : null}
                /> : <NoTasks />}

            <AddTaskModal />
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    noTasksMessage: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 15
    },
    avatar: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 999
    },
    userInfoText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default TasksList;