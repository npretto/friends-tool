import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { selectFriendById, selectFriendsId } from '../friends';
import { RootState } from '../store';

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
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('todo_detail', { id, title: friend.name })
        }
      >
        <Text>{friend.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
