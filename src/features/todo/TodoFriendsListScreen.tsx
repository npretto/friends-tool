import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import { Avatar, Factory, HStack, Stack, Text } from 'native-base';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { getInitials, selectFriendById, selectFriendsId } from '../friends';
import { RootState } from '../store';

const RNBTouchable = Factory(TouchableOpacity);

export const TodoFriendsListScreen = () => {
  const friendsIds = useSelector(selectFriendsId);

  return (
    <FlatList
      data={friendsIds}
      renderItem={({ item }) => <TodoFriendListItem id={item} />}
      keyExtractor={(key) => '' + key}
    />
  );
};

const TodoFriendListItem: React.FC<{ id: EntityId }> = ({ id }) => {
  const friend = useSelector((state: RootState) => selectFriendById(state, id));

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <RNBTouchable
      borderBottomWidth="1"
      borderBottomColor="gray.500"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      padding="3"
      flex={1}
      onPress={() =>
        navigation.navigate('todo_detail', { id, title: friend.name })
      }
    >
      <HStack alignItems="center">
        <Avatar mr="4">{getInitials(friend.name)}</Avatar>
        <Stack>
          <Text fontSize="md">{friend.name}</Text>
          {/* TODO add number of todo not done */}
          {/* <Text fontSize="md">{0} todo not done</Text> */}
        </Stack>
      </HStack>
    </RNBTouchable>
  );
};
