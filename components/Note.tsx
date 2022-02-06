import { StyleSheet, View, Text, Button, TouchableHighlight, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import Task from './Task';

interface Props {
    note: Object,
    remove: Function
};

const Note: React.FC<Props> = ({ note, remove }) => {

    let [tasks, setTasks] = useState<Array<Object>>([]);
    let [taskTitle, setTaskTitle] = useState<String>('');
    let [checked, setChecked] = useState<Number>(0);
    
    const handleDeleteNote = () => {
        remove();
    };

    const handleSubmit = () => {
        if (taskTitle) {
            setTasks(tasks = [...tasks, { id: Math.floor(Math.random() * 10000), taskTitle: taskTitle, check: false }]);
            setTaskTitle('');
            console.log(tasks)
        }
    };
    const handleDelete = (id: number) => {
        setTasks(tasks = tasks.filter(task => task.id !== id))
    };

    const handleCheck = (task: Object) => {
        const newTasks = [...tasks];  
        const index = newTasks.indexOf(task);
        newTasks[index] = { ...task };
        newTasks[index].check = !tasks[index].check;
        setTasks(newTasks);
        setChecked(checked = newTasks.filter(t => t.check).length);
        console.log(newTasks)
    }
    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <View style={styles.header}>
                    <Text style={styles.title}>{note.title}</Text>
                    <View style={styles.headerRight}>
                        <Text style={styles.checked}>{checked}/{tasks.length}</Text>
                        <TouchableHighlight>
                            <Button onPress={handleDeleteNote} title='Delete' color={'red'} />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={ styles.separator }></View>
                <View>
                    <FlatList data={tasks} keyExtractor={task => task.id.toString()} renderItem={({ item }) => <Task onCheck={() => handleCheck(item)} task={item} onDelete={() => handleDelete(item.id)} />} />
                </View>
            </View>
            <View style={styles.footer}>
                <TextInput style={styles.input} placeholder={'Add Task...'} value={taskTitle} onChangeText={text => setTaskTitle(text)} />
                <View>

                    <Button onPress={handleSubmit} title='Add' />
                </View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 230,
        padding: 7,
        margin: 10,
        borderWidth: 4,
        backgroundColor: '#e9f5f9',
        borderColor: 'dodgerblue',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flex: {

        flex: 1
    },
    footer: {
        flexDirection: 'row',
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        borderRadius: 5,
        marginRight: 5,
        borderColor: 'dodgerblue'
    },
    checked: {
        marginEnd: 10,
        fontSize: 16
    },
    separator: {
        height: 1,
        backgroundColor: 'dodgerblue',
        marginVertical: 5
    }
});
export default Note;