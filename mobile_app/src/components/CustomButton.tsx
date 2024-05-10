import { router } from 'expo-router';
import { Button, useTheme } from 'react-native-paper';

export default function CustomButton({
  loading,
  actionName,
}: {
  loading: boolean;
  actionName: string;
}) {
  const theme = useTheme();
  return (
    <Button
      mode='elevated'
      labelStyle={[
        theme.fonts.labelLarge,
        {
          color: 'white',
        },
      ]}
      style={[
        {
          marginVertical: 24,
          borderRadius: theme.roundness,
          backgroundColor: theme.colors.primary,
        },
      ]}
      onPress={() => {
        router.push('/SignUp');
      }}
      loading={loading}
      disabled={loading}>
      {actionName}
    </Button>
  );
}
