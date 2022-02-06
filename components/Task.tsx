import { StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';
import React from 'react';
import Swipeout from 'react-native-swipeout';

interface Props {
    task: Object,
    onCheck: Function,
    onDelete: Function
};

const Task: React.FC<Props> = ({task, onCheck, onDelete}) => {
    
    const swipeoutBtns = [
        {
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => { onDelete() }
        }
    ];


    return (
        <Swipeout backgroundColor='transparent' right={swipeoutBtns}>
            <TouchableHighlight underlayColor={'dodgerblue'} onPress={onCheck}>
                <View >
                    <Text style={[task.check ? styles.taskChecked : styles.task]}>{task.taskTitle}</Text>
                </View>
            </TouchableHighlight>
        </Swipeout>
    );
};

const styles = StyleSheet.create({
    task: {
        alignSelf: 'center',
        marginVertical: 4,
        color: 'black',
        fontSize: 16
    },
    taskChecked: {
        alignSelf: 'center',
        marginVertical: 4,
        color: 'green',
        fontSize: 16
    },
})
export default Task;