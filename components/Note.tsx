import { StyleSheet, View, Text, Button, TouchableHighlight, TextInput, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Task from './Task';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ConfirmProvider, useConfirm } from 'react-native-confirm-dialog';


interface Props {
    note: { id: Number, title: String },
    remove: Function
};

const Note: React.FC<Props> = ({ note, remove }) => {

    let [tasks, setTasks] = useState<Array<{taskTitle: String, id: Number, check: Boolean}>>([]);
    let [taskTitle, setTaskTitle] = useState<String>('');
    let [checked, setChecked] = useState<Number>(0);

    const ConfirmableButton = () => {
        const confirm = useConfirm()
        const handlePress = () => {
          confirm({
              title: 'Delete this note?',
              showCancel: true,
              confirmLabel: 'Delete',
              confirmButtonStyle: { backgroundColor: '#ff5d5d' },
              cancelButtonStyle: { backgroundColor: '#d3d3d3', borderWidth: 0 },
              onConfirm: () => {remove();}
          })
        }
        
        return <Ionicons name="trash-bin" onPress={handlePress} size={24} color="#c4213f" />
      }

    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      });
    

    const handleSubmit = () => {
        if (taskTitle) {
            setTasks(tasks = [...tasks, { id: Math.floor(Math.random() * 10000), taskTitle: taskTitle, check: false }]);
            setTaskTitle('');
        }
    };
    const handleDelete = (id: Number) => {
        let newTasks = tasks.filter(task => task.id !== id)
        setTasks(tasks = newTasks)
        setChecked(checked = newTasks.filter(t => t.check).length)
    };

    const handleCheck = (task: { check: Boolean, taskTitle: String, id: Number }) => {
        const newTasks = [...tasks];
        const index = newTasks.indexOf(task);
        newTasks[index] = { ...task };
        newTasks[index].check = !tasks[index].check;
        setTasks(newTasks);
        setChecked(checked = newTasks.filter(t => t.check).length);
    };

    
    if (!loaded) {
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <View style={styles.header}>
                    <Text style={styles.title}>{note.title}</Text>
                    <View style={styles.headerRight}>
                        <Text style={styles.checked}>{checked}/{tasks.length}</Text>
                        <TouchableHighlight>
                            <ConfirmProvider>
                            <ConfirmableButton />
                        {/* <Ionicons name="trash-bin" onPress={handleDeleteNote} size={24} color="#c4213f" /> */}
                                {/* <Button onPress={handleDeleteNote} title='Delete' color={'#c4213f'} /> */}
                                </ConfirmProvider>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={ styles.separator }></View>
                <ScrollView persistentScrollbar nestedScrollEnabled style={styles.scroll}>
                    <FlatList  data={tasks} keyExtractor={task => task.id.toString()} renderItem={({ item }) => <Task onCheck={() => handleCheck(item)} task={item} onDelete={() => handleDelete(item.id)} />} />
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TextInput maxLength={20} style={styles.input} placeholder={'Add Task...'} defaultValue={taskTitle.toString()} onChangeText={text => setTaskTitle(text)} />
                <View>
                    <Button onPress={handleSubmit} color={'#2a7dd1'} title='Add' />
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
        backgroundColor: '#f0f7ff',
        borderColor: '#2a7dd1',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Montserrat'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
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
        borderColor: '#2a7dd1',
        fontFamily: 'Montserrat'
    },
    checked: {
        marginEnd: 10,
        fontSize: 16
    },
    separator: {
        height: 1,
        backgroundColor: '#2a7dd1',
        marginVertical: 5
    },
    scroll: {
        marginBottom: 3
    }
});
export default Note;