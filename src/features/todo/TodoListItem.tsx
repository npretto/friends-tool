import { EntityId } from '@reduxjs/toolkit';
import { default as i18n, default as I18n } from 'i18n-js';
import { Box, Checkbox, SmallCloseIcon } from 'native-base';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteTodo, selectTodoById, updateTodo } from './todoSlice';

export const TodoListItem: React.FC<{ id: EntityId }> = ({ id }) => {
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
    <Box
      flexDir="row"
      padding="2"
      borderBottomWidth="1"
      borderBottomColor="dark.500"
      alignItems="center"
    >
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
          <SmallCloseIcon color="red.500" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
