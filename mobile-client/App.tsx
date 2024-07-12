import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './styles/globals.css';
import { ModeToggle } from './components/common/ThemeToggle';

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <SafeAreaView className='h-full bg-background'>
        <ModeToggle />
        <Text className="text-3xl font-medium">Hello World</Text>
      </SafeAreaView >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
