import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import { Box, Button, Factory } from 'native-base';
import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { navigateToFriend, selectFriendsId } from '../friends';
import { selectFriendByIdWithDistance } from './finderSlice';
import { formatDistance } from './formatDistance';
import { useLocationWatch } from './useLocationWatch';

const RNBTouchable = Factory(TouchableOpacity);

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

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Box
      borderBottomWidth="1"
      borderBottomColor="gray.500"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <RNBTouchable
        padding="3"
        flex={1}
        onPress={() =>
          navigation.navigate('finder_detail', { id, title: friend.name })
        }
      >
        <Box>
          <Text>{friend.name}</Text>
          {friend.distance && (
            <Text>{formatDistance(friend.distance)} away</Text>
          )}
        </Box>
      </RNBTouchable>
      <Box padding="3">
        <Button onPress={() => navigateToFriend(friend)}>Navigate</Button>
      </Box>
    </Box>
  );
};
