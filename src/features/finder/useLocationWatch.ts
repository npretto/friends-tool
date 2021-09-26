import * as Location from 'expo-location';
import I18n from 'i18n-js';
import { useToast } from 'native-base';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLocation } from './finderSlice';

export const useLocationWatch = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.show({
          description: I18n.t('permission-to-access-location-was-denied'),
          bgColor: 'red.500',
        });
        return;
      }

      Location.watchPositionAsync({}, (location) =>
        dispatch(updateLocation({ location }))
      );
    })();
  }, []);
};
