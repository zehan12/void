import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const COLOR_SCHEME_KEY = '@MyApp:colorScheme';

export function useColorScheme() {
  const { colorScheme: nativeColorScheme, setColorScheme: setNativeColorScheme, toggleColorScheme: toggleNativeColorScheme } = useNativewindColorScheme();

  const [colorScheme, setColorScheme] = useState('dark');

  useEffect(() => {
    const fetchColorScheme = async () => {
      try {
        const storedColorScheme = await AsyncStorage.getItem(COLOR_SCHEME_KEY);
        if (storedColorScheme) {
          setColorScheme(storedColorScheme);
        }
      } catch (error) {
        console.error('Error fetching color scheme from AsyncStorage:', error);
      }
    };

    fetchColorScheme();
  }, []);

  const setAndStoreColorScheme = async (newColorScheme: any) => {
    try {
      await AsyncStorage.setItem(COLOR_SCHEME_KEY, newColorScheme);
      setColorScheme(newColorScheme);
      setNativeColorScheme(newColorScheme);
    } catch (error) {
      console.error('Error storing color scheme in AsyncStorage:', error);
    }
  };

  const toggleAndStoreColorScheme = async () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    await setAndStoreColorScheme(newColorScheme);
    toggleNativeColorScheme();
  };

  return {
    colorScheme,
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme: setAndStoreColorScheme,
    toggleColorScheme: toggleAndStoreColorScheme,
  };
}
