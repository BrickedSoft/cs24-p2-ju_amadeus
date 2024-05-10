import { Pressable, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Header({ title }: { title: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
      }}>
      <Pressable
        onPress={() => {
          router.back();
        }}>
        <Ionicons
          name='arrow-back-outline'
          size={30}
          color='black'
          style={{ marginHorizontal: 12 }}
        />
      </Pressable>
      <Text style={{ fontSize: 18 }}>{title}</Text>
    </View>
  );
}
