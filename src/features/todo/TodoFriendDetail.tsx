import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import { default as i18n, default as I18n } from 'i18n-js';
import { Box, Checkbox, SmallCloseIcon } from 'native-base';
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
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { flex1 } from '../../styles';
import { RootState } from '../store';
import {
  addTodo,
  deleteTodo,
  selectTodoById,
  selectTodosForuserId,
  updateTodo,
} from './todoSlice';

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
        <FlatList
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const Item: React.FC<{ id: EntityId }> = ({ id }) => {
  const todo = useSelector((state: RootState) => selectTodoById(state, id));

  const dispatch = useDispatch();

  const markAsCompleteHandler = useCallback(
    (value) => {
      dispatch(updateTodo({ id, completed: value }));
    },
    [id]
  );

  const deleteHandler = useCallback(() => {
    dispatch(deleteTodo({ id }));
  }, [id]);

  return (
    <Box flexDir="row" padding="2">
      <Box>
        <Checkbox
          isChecked={todo.completed}
          value="completed"
          marginRight="1"
          accessibilityLabel={
            todo.completed ? i18n.t('mark-as-undone') : i18n.t('mark-as-done')
          }
          onChange={markAsCompleteHandler}
        />
      </Box>
      <Box flex={1}>
        <Text>{todo.title}</Text>
      </Box>
      <Box>
        <TouchableOpacity
          accessibilityLabel={I18n.t('delete')}
          onPress={deleteHandler}
        >
          <SmallCloseIcon color="#FF7777" />
        </TouchableOpacity>
      </Box>
    </Box>
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
