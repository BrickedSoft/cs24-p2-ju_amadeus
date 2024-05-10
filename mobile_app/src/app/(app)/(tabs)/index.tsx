import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';
import { useSession } from '@/utils/authContext';
import CurrentLocationPoll from '@/components/CurrentLocationPoll';
type GroupTabType = {
  title: string;
  Icon: JSX.Element;
  href: string;
};
export default function Tab() {
  const { role } = useSession();
  const firstRow: GroupTabType[] = [
    {
      title: 'Report',
      href: '/Report',
      Icon: (
        <AntDesign
          name='exclamationcircleo'
          size={40}
          color='black'
        />
      ),
    },
    {
      title: 'Map',
      href: '/Map',
      Icon: (
        <Ionicons
          name='navigate-circle-outline'
          size={45}
          color='black'
        />
      ),
    },
    {
      title: 'Volunteer',
      href: '',
      Icon: (
        <Ionicons
          name='people-circle-outline'
          size={45}
          color='black'
        />
      ),
    },
  ];

  const secondRow: GroupTabType[] = [
    {
      title: 'Forum',
      href: '',
      Icon: (
        <MaterialCommunityIcons
          name='forum-outline'
          size={40}
          color='black'
        />
      ),
    },
    {
      title: 'Content',
      href: '',
      Icon: (
        <MaterialCommunityIcons
          name='table-of-contents'
          size={45}
          color='black'
        />
      ),
    },
    {
      title: 'Social',
      href: '',
      Icon: (
        <FontAwesome5
          name='hands-helping'
          size={24}
          color='black'
        />
      ),
    },
  ];

  const theme = useTheme();
  const GroupTab = ({ Icon, title, href }: GroupTabType) => {
    return (
      <>
        <Pressable
          onPress={() => {
            router.push(href);
          }}
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 128,
            height: 110,
            padding: 24,
            elevation: 9,
          }}>
          {Icon}
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </Pressable>
      </>
    );
  };
  if (role == 'Citizen')
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            alignContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 32,
            paddingVertical: 6,
            alignItems: 'center',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={require('../../../../assets/ecosync-icon.png')}
          />
          <Ionicons
            name='notifications'
            size={30}
            color={theme.colors.primary}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            height: 280,
            margin: 24,
            justifyContent: 'space-evenly',
            borderColor: '#DCDCDC',
            borderWidth: 2,
            borderRadius: 13,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            {firstRow.map((item) => (
              <GroupTab
                key={item.title}
                title={item.title}
                Icon={item.Icon}
                href={item.href}
              />
            ))}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            {secondRow.map((item) => (
              <GroupTab
                key={item.title}
                title={item.title}
                Icon={item.Icon}
                href={item.href}
              />
            ))}
          </View>
        </View>
        <Text style={{ padding: 12, fontSize: 18, fontWeight: 'bold' }}>
          Upcoming event:
        </Text>
        <View
          style={{
            flexDirection: 'column',
            height: 280,
            marginHorizontal: 24,
            borderColor: '#DCDCDC',
            borderWidth: 2,
            borderRadius: 13,
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginTop: 12,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Dhaka North City Sanitation Trade Fair
          </Text>
          <Image
            style={{
              width: 256,
              height: 140,
              margin: 12,
            }}
            source={require('../../../../assets/eventjpg.jpg')}
          />
          <Text style={{ padding: 12 }}>
            Dhaka North City Sanitation Trade Fair 2023 will be held in Justice.
            Sahabuddin Ahmed Park, Gulshan-2, Dhaka 9th 10th March 2023.
          </Text>
        </View>
      </View>
    );

  if (role == 'DNCCWorker')
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CurrentLocationPoll />
      </View>
    );
  return <View></View>;
}
