import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

type Props = {
};

const DoneTasks: React.FC<Props> = () => {

    return (
        <View style={s.container}>
            <Text>DoneTasks</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default DoneTasks;