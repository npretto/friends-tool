import { compose } from '@reduxjs/toolkit';
import { head, join, map, split } from 'ramda';
import openMap from 'react-native-open-maps';
import { Friend } from './friend';

export const getInitials = compose(join(''), map(head), split(' '));

// not sure this should be in this feature folder
export const navigateToFriend = (friend: Friend) => {
  openMap({
    longitude: Number(friend.address.geo.lng),
    latitude: Number(friend.address.geo.lat),
    navigate: true,
  });
};
