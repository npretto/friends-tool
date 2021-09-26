import { EntityId } from '@reduxjs/toolkit';
import { Box, Button } from 'native-base';
import React from 'react';
import { FlatList, Text } from 'react-native';
import openMap from 'react-native-open-maps';
import { useSelector } from 'react-redux';
import { selectFriendsId } from '../friends';
import { selectFriendByIdWithDistance } from './finderSlice';
import { formatDistance } from './formatDistance';
import { useLocationWatch } from './useLocationWatch';

export const FinderFriendsListScreen = () => {
  const friendsIds = useSelector(selectFriendsId);

  useLocationWatch();

  return (
    <FlatList
      data={friendsIds}
      renderItem={({ item }) => <FinderFriendListItem id={item} />}
      keyExtractor={(key) => '' + key}
    />
  );
};

const FinderFriendListItem: React.FC<{ id: EntityId }> = ({ id }) => {
  const friend = useSelector(selectFriendByIdWithDistance(id));

  return (
    <Box
      borderBottomWidth="1"
      borderBottomColor="gray.500"
      padding="3"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Text>{friend.name}</Text>
        {friend.distance && <Text>{formatDistance(friend.distance)} away</Text>}
      </Box>
      <Button
        onPress={() => {
          openMap({
            longitude: Number(friend.address.geo.lng),
            latitude: Number(friend.address.geo.lat),
            navigate: true,
          });
        }}
      >
        Navigate
      </Button>
    </Box>
  );
};
