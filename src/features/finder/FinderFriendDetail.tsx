import { AntDesign, Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import I18n from 'i18n-js';
import { Avatar, Box, Button, Heading, Text } from 'native-base';
import React from 'react';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { getInitials, navigateToFriend, selectFriendById } from '../friends';
import { RootState } from '../store';

type Props = NativeStackScreenProps<RootStackParamList, 'finder_detail'>;

export const FinderFriendDetail = ({ route }: Props) => {
  const { id } = route.params;

  const friend = useSelector((s: RootState) => selectFriendById(s, id));

  const { phone, email, website, username, name } = friend;

  const { city, zipcode, suite, street } = friend.address;

  return (
    <Box>
      <Box flexDir="row" alignItems="center" p="3" my="5">
        <Avatar>{getInitials(name)}</Avatar>
        <Box ml="10">
          <Heading textAlign="center">{friend.name}</Heading>
          <Text textAlign="center">({username})</Text>
        </Box>
      </Box>
      <Box flexDir="row" justifyContent="center">
        <Button
          mx="2"
          bgColor="white"
          borderColor="black"
          borderWidth="1"
          onPress={() => Linking.openURL(`mailto:${email}`)}
        >
          <AntDesign name="mail" size={24} color="black" />
        </Button>
        <Button
          mx="2"
          bgColor="white"
          borderColor="black"
          borderWidth="1"
          onPress={() => Linking.openURL(`sms:${phone}`)}
        >
          <AntDesign name="message1" size={24} color="black" />
        </Button>

        <Button
          mx="2"
          bgColor="white"
          borderColor="black"
          borderWidth="1"
          onPress={() => Linking.openURL(`tel:${phone}`)}
        >
          <AntDesign name="phone" size={24} color="black" />
        </Button>
        <Button
          mx="2"
          bgColor="white"
          borderColor="black"
          borderWidth="1"
          onPress={() => navigateToFriend(friend)}
        >
          <Feather name="navigation" size={24} color="black" />
        </Button>
      </Box>
      {/* TODO: add links here too */}
      <Box p="2">
        <Text fontSize="2xl">{I18n.t('contacts')} </Text>
        {phone && (
          <Text>
            {I18n.t('phone')}: {phone}
          </Text>
        )}
        {phone && (
          <Text>
            {I18n.t('email')}: {email}
          </Text>
        )}
        {phone && (
          <Text>
            {I18n.t('website')}: {website}
          </Text>
        )}
      </Box>
      <Box p="2">
        <Text fontSize="2xl">{I18n.t('address')}</Text>
        <Text>
          {suite}, {street}
        </Text>
        <Text>
          {city}, {zipcode}
        </Text>
      </Box>
      {/* TODO: add some content here or center the content to not leave all this emptiness at the bottom */}
    </Box>
  );
};
