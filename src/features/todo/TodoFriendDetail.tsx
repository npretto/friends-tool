import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import I18n from 'i18n-js';
import { Box, Button, Input } from 'native-base';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { flex1 } from '../../styles';
import { TodoListItem } from './TodoListItem';
import { addTodo, selectTodosForuserId } from './todoSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'todo_detail'>;

export const TodoFriendDetail = ({ route }: Props) => {
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();

  const { id } = route.params;

  const [todoTitle, setTodoTitle] = useState('');

  const todoIds = useSelector(selectTodosForuserId(id));

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
        <FlatList
          data={todoIds}
          renderItem={({ item }) => <TodoListItem id={item} />}
          keyExtractor={(key) => '' + key}
          initialNumToRender={50}
        />
        <Box p="1" flexDir="row">
          <Input
            flex={1}
            value={todoTitle}
            placeholder={I18n.t('todo-text-placeholder')}
            testID="todo_title_input"
            onChangeText={setTodoTitle}
          />
          <Button ml={1} onPress={addTodoHandler}>
            {I18n.t('add-todo')}
          </Button>
        </Box>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
