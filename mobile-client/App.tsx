import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import './styles/globals.css';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({});
