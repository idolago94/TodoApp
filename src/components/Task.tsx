import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import SVGIcon from './SVGIcon';
import imgSrc from '../utils/Images';
import { TasksContext } from '../utils/TaskContext';
import AddTaskModal from './AddTaskModal';
import moment from 'moment'
export type TaskProps = {
    title: String,
    isDone: Date | null,
    index?: Number
};



const Task: React.FC<TaskProps> = ({ title, isDone, index }) => {
    const [isEditModalVisible, setEditModalVisible] = useState(false)
    const { tasks, updateTasks } = useContext(TasksContext)

    const handleTaskComplete = () => {
        if (index === 0 || index) {
            try {
                let newTasks = tasks.slice()
                if (newTasks[+index].isDone) {
                    newTasks[+index].isDone = null
                } else newTasks[+index].isDone = new Date()
                updateTasks(newTasks)
            } catch (e) {
                console.log("hanleTaskComplete -> e", e)
            }
        }
    }

    const handleDeleteTask = () => {
        if (index === 0 || index) {
            try {
                let newTasks = tasks.slice()
                newTasks.splice(+index, 1)
                updateTasks(newTasks)
            } catch (e) {
                console.log("handleDeleteTask -> e", e)
            }
        }
    }

    return (
        <View style={s.container}>
            <View style={[s.row, s.infoWrap]}>
                <View style={s.row}>
                    <Switch onChange={handleTaskComplete} value={!!isDone} />
                    <Text>{title}</Text>
                </View>
                <View style={s.row}>
                    <TouchableOpacity onPress={() => setEditModalVisible(true)}>
                        <SVGIcon source={imgSrc.a_icons_edit} width={23} height={23} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteTask}>
                        <SVGIcon source={imgSrc.a_icon_delete} width={23} height={23} />
                    </TouchableOpacity>
                </View>
            </View>
            {isDone && <Text style={s.doneDate}>Done at: {moment(isDone).format('DD/MM/YYYY')}</Text>}

            <AddTaskModal editValues={{ title, isDone, index }} visible={isEditModalVisible} onClose={() => setEditModalVisible(false)} />
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomColor: 'rgba(0, 0, 0, .2)',
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoWrap: {
        justifyContent: 'space-between',
    },
    doneDate: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, .5)'
    }
})

export default Task