import { router } from 'expo-router';
import { Text, Image, View, Pressable } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useRef, useState } from 'react';
import React from 'react';
import { signUpApi } from '@/api/api';
const signUp = () => {};
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');

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
          height: 285,
          rowGap: 12,
          flexDirection: 'column',
          width: '100%',
        }}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          mode='outlined'
          placeholder='Email'
          value={email}
          textContentType='emailAddress'
          keyboardType='default'
        />
        <TextInput
          onChangeText={(text) => setName(text)}
          mode='outlined'
          placeholder='Name'
          value={name}
          textContentType='name'
          keyboardType='default'
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          mode='outlined'
          placeholder='Password'
          value={password}
          textContentType='password'
          keyboardType='default'
        />
        <TextInput
          onChangeText={(text) => setRepeatPassword(text)}
          mode='outlined'
          placeholder='Repeat Password'
          value={repeatPassword}
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
          const signed = await signUpApi({
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            name: name,
          });
          setLoading(false);
          if (signed) router.replace('/Landing');
        }}
        loading={loading}
        disabled={loading}>
        Sign Up
      </Button>
    </View>
  );
}
