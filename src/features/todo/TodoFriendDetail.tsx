import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { RootState } from '../store';
import { selectTodoById, selectTodosForuserId } from './todoSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'todo_detail'>;

export const TodoFriendDetail = ({ route }: Props) => {
  const { id } = route.params;

  const todoIds = useSelector(selectTodosForuserId(id));

  return (
    <FlatList
      data={todoIds}
      renderItem={({ item }) => <Item id={item} />}
      keyExtractor={(key) => '' + key}
    />
  );
};

const Item: React.FC<{ id: EntityId }> = ({ id }) => {
  const todo = useSelector((state: RootState) => selectTodoById(state, id));

  return (
    <View>
      <Text>{todo.title}</Text>
    </View>
  );
};
