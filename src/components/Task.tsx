import React from 'react';
import { Text } from 'react-native';

export type TaskProps = {
    title: String,
    isDone: Date | null,
    index?: Number
};



const Task: React.FC<TaskProps> = ({ title, isDone, index }) => (
    <Text>task {index}</Text>
)

export default Task