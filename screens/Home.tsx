import { View } from 'react-native';
import React, { useState } from 'react';
import CreateNote from '../components/CreateNote';
import MyNotes from '../components/MyNotes';

export default function Home() {

  let [title, setTitle] = useState<String>('');
  let [notes, setNotes] = useState<Array<{id: Number, title: String}>>([]);
  
  const handleTitleChange = (newTitle: String) => {
    setTitle(newTitle);
  }

  const handleSubmit = () => {
    if (title) {
      setNotes([...notes, { id: Math.floor(Math.random() * 10000), title: title }]);
      setTitle('');
    };
  };
  const handleDelete = (id: Number) => {
    setNotes(notes = notes.filter(note => note.id !== id))
  };

  return (
    <View>
      <CreateNote title={title} onSubmit={handleSubmit} setTitle={handleTitleChange} />
      <MyNotes notes={notes} onDelete={handleDelete} />
    </View>
  );
};
