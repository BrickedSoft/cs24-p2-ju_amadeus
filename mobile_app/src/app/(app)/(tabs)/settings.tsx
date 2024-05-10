import { View, Text } from 'react-native';
import { useSession } from '@utils/authContext';
import { Button, useTheme } from 'react-native-paper';
export default function Tab() {
  const { signOut } = useSession();
  const theme = useTheme();
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
        }}
        onPress={() => signOut()}>
        Sign Out
      </Button>
    </View>
  );
}
