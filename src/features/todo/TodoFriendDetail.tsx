import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import React, { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { flex1 } from '../../styles';
import { RootState } from '../store';
import { addTodo, selectTodoById, selectTodosForuserId } from './todoSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'todo_detail'>;

export const TodoFriendDetail = ({ route }: Props) => {
  const { id } = route.params;
  const dispatch = useDispatch();

  const todoIds = useSelector(selectTodosForuserId(id));

  const headerHeight = useHeaderHeight();

  const [todoTitle, setTodoTitle] = useState('');

  const addTodoHandler = useCallback(() => {
    dispatch(addTodo({ userId: id, title: todoTitle }));
    setTodoTitle('');
  }, [todoTitle, id]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={flex1}
    >
      <SafeAreaView style={flex1}>
        <View style={flex1}>
          <FlatList
            contentContainerStyle={flex1}
            data={todoIds}
            renderItem={({ item }) => <Item id={item} />}
            keyExtractor={(key) => '' + key}
            initialNumToRender={50}
          />
          <View style={styles.addTodoContainer}>
            <TextInput
              value={todoTitle}
              placeholder="todo title"
              testID="todo_title_input"
              style={[flex1, styles.addTodoInput]}
              onChangeText={setTodoTitle}
            />
            <Button title="Add TODO" onPress={addTodoHandler} />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  addTodoContainer: {
    flexDirection: 'row',
  },
  addTodoInput: {
    padding: 5,
  },
});
