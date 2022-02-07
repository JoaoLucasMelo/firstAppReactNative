
import {  View } from 'react-native';
import Home from './screens/Home';

export default function App() {
  console.warn = () => { };

  return (
    <View>
      <Home />
    </View>
  );
}


