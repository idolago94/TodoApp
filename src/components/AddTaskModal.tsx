import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Modal } from 'react-native';
import { TasksContext } from '../utils/TaskContext';

type Props = {
};

const AddTaskModal: React.FC<Props> = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [taskDescription, setTaskDescription] = useState('')
    const { tasks, updateTasks } = useContext(TasksContext)

    const handleSaveTask = () => {
        let newTasks = tasks.slice()
        newTasks.push({ title: taskDescription, isDone: null })
        updateTasks(newTasks)

        setModalVisible(false)
        setTaskDescription('')
    }

    return (
        <>
            <View style={[s.buttonWrap, s.bgPrimary]}>
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Add New Task"
                    color="white"
                />
            </View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                presentationStyle='pageSheet'
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={s.modalContainer}>
                    <Text style={s.instructions}>Typing the task description:</Text>
                    <TextInput style={s.textInput} value={taskDescription} onChangeText={(text) => setTaskDescription(text)} />
                    <View style={s.modalButtonsWrap}>
                        <View style={[s.buttonWrap, s.bgPrimary, s.grow]}>
                            <Button
                                onPress={handleSaveTask}
                                title="Save"
                                color="white"
                            />
                        </View>
                        <View style={[s.buttonWrap, s.bgCancel, s.grow]}>
                            <Button
                                onPress={() => setModalVisible(false)}
                                title="Cancel"
                                color="white"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const s = StyleSheet.create({
    buttonWrap: {
        margin: 10,
        borderRadius: 5,
    },
    modalContainer: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10
    },
    modalButtonsWrap: {
        paddingVertical: 20,
        flexDirection: 'row'
    },
    instructions: {
        paddingVertical: 20,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    bgPrimary: { backgroundColor: '#5585d9' },
    bgCancel: { backgroundColor: 'red' },
    grow: { flexGrow: 1 }
});

export default AddTaskModal;