import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationObject } from 'expo-location';
import { getDistance } from 'geolib';
import { selectFriendById } from '../friends';
import { RootState } from '../store';

// this could probably be a "location" slice but I named it this way
// to keep the separation of the two "exercises" of the app

const initialState = {
  location: undefined as undefined | LocationObject,
};

const finderSlice = createSlice({
  name: 'finder',
  initialState,
  reducers: {
    updateLocation: (
      state,
      action: PayloadAction<{ location: LocationObject }>
    ) => {
      state.location = action.payload.location;
    },
  },
});

export const finderReducer = finderSlice.reducer;

export const { updateLocation } = finderSlice.actions;

export const selectLocation = (s: RootState) => s.finder.location;

export const selectFriendByIdWithDistance = (id) =>
  createSelector(
    (s: RootState) => selectFriendById(s, id),
    selectLocation,
    (friend, location) => {
      const distance = location?.coords
        ? getDistance(location.coords, friend.address.geo)
        : undefined;

      return {
        ...friend,
        distance,
      };
    }
  );
