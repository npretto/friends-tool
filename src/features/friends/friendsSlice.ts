import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import friendsData from '../../data/friends.json';
import { RootState } from '../store';
import { Friend } from './friend';

const friendsAdapter = createEntityAdapter<Friend>({
  selectId: (f: Friend) => f.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = friendsAdapter.getInitialState();

export const friendsSlice = createSlice({
  name: 'friendsList',
  initialState,
  reducers: {
    loadFriends: (state) => friendsAdapter.setAll(state, friendsData),
  },
});

export const friendsReducer = friendsSlice.reducer;

export const { loadFriends } = friendsSlice.actions;

export const { selectIds: selectFriendsId, selectById: selectFriendById } =
  friendsAdapter.getSelectors((s: RootState) => s.friends);
