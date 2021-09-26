import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const friendsSlice = createSlice({
  name: 'friendsList',
  initialState,
  reducers: {},
});

export const friendsReducer = friendsSlice.reducer;
