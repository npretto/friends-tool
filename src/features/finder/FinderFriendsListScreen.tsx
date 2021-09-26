import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import I18n from 'i18n-js';
import { Avatar, Box, Button, Factory, HStack, Stack, Text } from 'native-base';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { getInitials, navigateToFriend } from '../friends';
import {
  selectFriendByIdWithDistance,
  selectFriendsSortedByDistance,
} from './finderSlice';
import { formatDistance } from './formatDistance';
import { useLocationWatch } from './useLocationWatch';

const RNBTouchable = Factory(TouchableOpacity);

export const FinderFriendsListScreen = () => {
  const friends = useSelector(selectFriendsSortedByDistance);

  useLocationWatch();

  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => <FinderFriendListItem id={item.id} />}
      keyExtractor={(item) => '' + item.id}
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
        <HStack alignItems="center">
          <Avatar mr="4">{getInitials(friend.name)}</Avatar>
          <Stack>
            <Text fontSize="md">{friend.name}</Text>
            {friend.distance && (
              <Text>
                {I18n.t('distance-away', {
                  distance: formatDistance(friend.distance),
                })}
              </Text>
            )}
          </Stack>
        </HStack>
      </RNBTouchable>
      <Box padding="3">
        <Button onPress={() => navigateToFriend(friend)}>Navigate</Button>
      </Box>
    </Box>
  );
};
