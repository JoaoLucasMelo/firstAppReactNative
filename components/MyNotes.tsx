import React from 'react';
import { FlatList, View, Text } from 'react-native';
import Note from './Note';

interface Props {
    notes: Array<Object>,
    onDelete: Function
};

const MyNotes: React.FC<Props> = ({ notes, onDelete }) => {

    const handleDelete = (id: Number) => {
        onDelete(id)
    }

    return (
        <View>
            <FlatList data={notes} keyExtractor={note => note.id.toString()} renderItem={({ item }) => <Note note={item} remove={() => handleDelete(item.id)} />}/>
        </View>
  );
};

export default MyNotes;