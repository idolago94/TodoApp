import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, FlatList } from 'react-native';
import { User } from '@react-native-google-signin/google-signin';

type Props = {
    tasks: Array<Object>,
    user: User
};

const Tasks: React.FC<Props> = ({ tasks = [], user }) => {

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
            {tasks.length > 0 ?
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={Task}
                /> : <NoTasks />}
        </View>
    );
}

type TaskProps = {
    item: Object,
    index: Number
};

const Task: React.FC<TaskProps> = ({ item, index }) => (
    <Text>task {index}</Text>
)

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
        marginHorizontal: 15,
        borderBottomColor: 'rgba(0, 0, 0, .1)',
        borderBottomWidth: 1
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

export default Tasks;