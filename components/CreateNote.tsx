import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';

interface Props {
    onSubmit: Function,
    setTitle: Function,
    title: String
};

const CreateNote: React.FC<Props> = ({ onSubmit, setTitle, title }) => {

    const handleCreate = () => {
        onSubmit();
    };

    return (
        <View style={styles.containter}>
            <Text style={styles.title}>Create a new note</Text>
            <TextInput style={styles.input} placeholder="Note name here.." value={title} onChangeText={text => setTitle(text)} />
            <TouchableHighlight>
                <Button title='Add Note' onPress={handleCreate} />
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    containter: {
      padding: 15
    },
    title: {
        fontSize: 18,
        marginTop: 10
    },
    input: {
        height: 40,
        marginTop: 15,
        borderWidth: 1,
        padding: 10,
        marginBottom: 7,
        borderRadius: 5
      },
});

export default CreateNote;