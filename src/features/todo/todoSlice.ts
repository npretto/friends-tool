import { createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import todosData from '../../data/todos.json';
import { RootState } from '../store';
import { Todo } from './todo';

const todosAdapter = createEntityAdapter<Todo>({
  selectId: (f: Todo) => f.id,
  // sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = todosAdapter.getInitialState();

export const todosSlice = createSlice({
  name: 'todosList',
  initialState,
  reducers: {
    loadTodos: (state) => todosAdapter.setAll(state, todosData),
  },
});

export const todosReducer = todosSlice.reducer;

export const { loadTodos } = todosSlice.actions;

export const {
  selectAll,
  selectIds,
  selectById: selectTodoById,
} = todosAdapter.getSelectors((s: RootState) => s.todos);

export const selectTodosForuserId = (id: EntityId) => (state: RootState) => {
  return selectAll(state)
    .filter(({ userId }) => userId === id)
    .map((todo) => todo.id);
};
