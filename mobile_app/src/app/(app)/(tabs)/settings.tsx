import { View, Text } from 'react-native';
import { useSession } from '@utils/authContext';
import { Button, useTheme } from 'react-native-paper';
export default function Tab() {
  const { signOut } = useSession();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        mode='elevated'
        labelStyle={[
          theme.fonts.labelLarge,
          {
            color: 'white',
          },
        ]}
        style={{
          borderRadius: theme.roundness,
          backgroundColor: theme.colors.primary,
          margin: 24,
        }}
        onPress={() => signOut()}>
        Sign Out
      </Button>
    </View>
  );
}
