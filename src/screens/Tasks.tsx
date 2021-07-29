import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

type Props = {
};

const Tasks: React.FC<Props> = () => {

    return (
        <View style={s.container}>
            <Text>Tasks</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Tasks;