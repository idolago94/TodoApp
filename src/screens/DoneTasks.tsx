import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TasksContext } from '../utils/TaskContext';
import Task from '../components/Task';

const DoneTasks: React.FC<{}> = () => {
    const { tasks } = useContext(TasksContext)

    const NoTasks = () => (
        <View style={[s.container, s.center]}>
            <Text style={s.noTasksMessage}>No Done Tasks Available</Text>
        </View>
    )

    return (
        <View style={s.container}>
            {tasks.filter(t => t.isDone).length > 0 ?
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => item.isDone && <Task index={index} {...item} />}
                /> : <NoTasks />}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    noTasksMessage: {
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default DoneTasks;