import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import CustomButton from './CustomButton';
import ecoSync from '@/api/ecoSync';
import { locationPoll } from '@/data/endpoints';
import { useSession } from '@/utils/authContext';
import { pollLocationApi } from '@/api/api';

export default function CurrentLocationPoll() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState(null);
  const { session, userId } = useSession();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View
      style={{
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 24,
        borderColor: '#DCDCDC',
        borderWidth: 2,
        borderRadius: 13,
        padding: 12,
      }}>
      <Text
        style={{
          fontSize: 18,
          color: 'gray',
          fontWeight: '700',
          marginVertical: 12,
        }}>
        Only you can see your current loaction and decide to share with the
        organization!
      </Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
        Logitude:{' '}
        <Text style={{ fontWeight: 'normal' }}>
          {location?.coords.longitude}
        </Text>
      </Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
        Latitude:{' '}
        <Text style={{ fontWeight: 'normal' }}>
          {location?.coords.latitude}
        </Text>
      </Text>
      <CustomButton
        onPress={async () => {
          setLoading(true);
          const loca = await Location.getCurrentPositionAsync({});
          const res = pollLocationApi(
            {
              latitude: loca?.coords.latitude,
              longitude: loca?.coords.longitude,
            },
            session,
            userId
          );
          setLocation(loca)
          setLoading(false);
        }}
        loading={loading}
        actionName={'Submit your current loacation'}
      />
    </View>
  );
}
