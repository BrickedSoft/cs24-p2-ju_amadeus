import { Text, Image, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';

export default function SignIn() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ height: 460, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../../assets/ecosync-icon.png')}
          />
          <Text
            style={{
              color: 'green',
              fontSize: 28,
              fontWeight: '700',
            }}>
            EcoSync
          </Text>
        </View>
      </View>
      <View style={{ margin: 24 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'left',
            fontWeight: 'bold',
          }}>
          Optimizing Waste Management for a Sustainable Future.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'left',
            color: 'gray',
          }}>
          EcoSync streamlines collection with real-time data and intelligent
          routing, building a cleaner, greener future.
        </Text>
        <Button
          mode='elevated'
          labelStyle={[
            theme.fonts.labelLarge,
            {
              color: 'white',
            },
          ]}
          style={{
            marginVertical: 24,
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.primary,
          }}
          onPress={() => {
            router.push('/SignUp');
          }}
          loading={loading}
          disabled={loading}>
          Sign up
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 220
          }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'left',
            }}>
            Already have an account?
          </Text>
          <Pressable
            onPress={() => {
              router.push('/SignIn');
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: theme.colors.primary,
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
