import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationObject } from 'expo-location';
import { getDistance } from 'geolib';
import { map, prop, sortBy } from 'ramda';
import { Friend, selectAllFriends, selectFriendById } from '../friends';
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

const getDist = ({
  location,
  friend,
}: {
  location: LocationObject;
  friend: Friend;
}) =>
  location?.coords
    ? getDistance(location.coords, friend.address.geo)
    : undefined;

const addDistanceFrom = (location: LocationObject) => (friend: Friend) => ({
  ...friend,
  distance: getDist({ location, friend }),
});

export const selectFriendsSortedByDistance = createSelector(
  selectAllFriends,
  selectLocation,
  (friends, location) =>
    sortBy(prop('distance'))(map(addDistanceFrom(location))(friends))
);

// this is kinda not needed anymore because now that I'm sorting friends by distance I could just pass the friend with the distance
// TODO: investigate if createSelector's memoization works with this (id) => ... signature
export const selectFriendByIdWithDistance = (id) =>
  createSelector(
    (s: RootState) => selectFriendById(s, id),
    selectLocation,
    (friend, location) => addDistanceFrom(location)(friend)
  );
