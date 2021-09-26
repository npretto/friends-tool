import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import { last } from 'ramda';
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
    addTodo: (
      state,
      action: PayloadAction<{ title: string; userId: EntityId }>
    ) => {
      const { title, userId } = action.payload;
      // TODO: should find a way to override EntityId to be number
      const id = (last(state.ids) as number) + 1;

      todosAdapter.addOne(state, { title, userId, completed: false, id });
    },
  },
});

export const todosReducer = todosSlice.reducer;

export const { loadTodos, addTodo } = todosSlice.actions;

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
