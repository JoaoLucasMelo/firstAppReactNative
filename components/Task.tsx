import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Swipeout from 'react-native-swipeout';
import { useFonts } from 'expo-font';

interface Props {
    task: { taskTitle: String, id: Number, check: Boolean},
    onCheck: Function,
    onDelete: Function
};

const Task: React.FC<Props> = ({ task, onCheck, onDelete }) => {
    
    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      });
    
    const swipeoutBtns = [
        {
            text: 'DELETE',
            backgroundColor: '#c4213f',
            onPress: () => { onDelete() }
        }
    ];

    if (!loaded) {
        return null;
    };

    return (
        <Swipeout style={styles.margin} backgroundColor='transparent'  right={swipeoutBtns}>
            <TouchableOpacity  onPress={() => onCheck()}>
                <View >
                    <Text style={[task.check ? styles.taskChecked : styles.task]}>• {task.taskTitle} { task.check? '✔' : '' }</Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
};

const styles = StyleSheet.create({
    task: {
        alignSelf: 'center',
        marginVertical: 4,
        color: 'black',
        fontSize: 16,
        fontFamily: 'Montserrat'
    },
    taskChecked: {
        alignSelf: 'center',
        marginVertical: 4,
        color: 'green',
        fontSize: 16,
        fontFamily: 'Montserrat'
    },
    margin: {
        marginVertical: 3,
    }
})
export default Task;