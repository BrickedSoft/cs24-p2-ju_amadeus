import { router } from 'expo-router';
import { Text, Image, View, Pressable } from 'react-native';
import { useSession } from '@utils/authContext';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useRef, useState } from 'react';
import React from 'react';

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordRef = useRef();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{
          width: 126,
          height: 126,
        }}
        source={require('../../assets/ecosync-icon.png')}
      />
      <Text
        style={{
          color: 'green',
          fontSize: 24,
          fontWeight: '700',
        }}>
        EcoSync
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          padding: 4,
        }}>
        Optimizing Waste Management for a Sustainable Future.
      </Text>
      <View
        style={{
          marginTop: 36,
          paddingHorizontal: 24,
          height: 250,
          rowGap: 12,
          flexDirection: 'column',
          width: '100%',
        }}>
        <TextInput
          ref={emailInputRef.current}
          onChangeText={(text) => setEmail(text)}
          mode='outlined'
          placeholder='Email'
          value={email}
          textContentType='emailAddress'
          keyboardType='default'
        />
        <TextInput
          ref={passwordRef.current}
          onChangeText={(text) => setPassword(text)}
          mode='outlined'
          placeholder='Password'
          value={password}
          textContentType='password'
          keyboardType='default'
        />
      </View>
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
        onPress={async () => {
          setLoading(true);
          const signed = await signIn({
            email: email,
            password: password,
          });
          setLoading(false);
          if (signed) router.replace('/');
        }}
        loading={loading}
        disabled={loading}>
        Sign In
      </Button>
    </View>
  );
}
