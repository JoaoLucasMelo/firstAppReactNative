import React, { useEffect } from 'react';
import { FlatList, LogBox, ScrollView, View } from 'react-native';
import Note from './Note';

interface Props {
    notes: Array<{title: String, id: Number}>,
    onDelete: Function
};

const MyNotes: React.FC<Props> = ({ notes, onDelete }) => {

    const handleDelete = (id: Number) => {
        onDelete(id)
    }
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);   
    }, [])

    return (
        <ScrollView  style={{height: 670}} >
            <FlatList nestedScrollEnabled data={notes} keyExtractor={note => note.id.toString()} renderItem={({ item }) => <Note note={item} remove={() => handleDelete(item.id)} />} />
        </ScrollView>
  );
};

export default MyNotes;