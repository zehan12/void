import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import './styles/globals.css';
import AppNavigator from './navigation/AppNavigator';
import Profile from './screens/Profile';

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <Profile />
    </>
  );
}

const styles = StyleSheet.create({});
