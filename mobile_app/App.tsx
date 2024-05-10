import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 items-center bg-red-100 pt-10 w-fit'>
      <View className='flex-row w-full justify-between'>
        <Text>Baam</Text>

        <Text>Daaan</Text>
      </View>
      <Text className='text-blue-500 '>
        Majhkhan!!!
      </Text>

      <StatusBar style='auto' />
    </View>
  );
}
