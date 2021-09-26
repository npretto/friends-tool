import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import i18n from 'i18n-js';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { loadFriends } from './src/features/friends';
import { persistor, store } from './src/features/store';
import { TodoFriendsListScreen } from './src/features/todo';
import { TodoFriendDetail } from './src/features/todo/TodoFriendDetail';
import { loadTodos } from './src/features/todo/todoSlice';
import './src/setupLocalizations';

export type RootStackParamList = {
  home: undefined;
  todo: undefined;
  todo_detail: { id: EntityId; title: string };
  finder: undefined;
};

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text> {i18n.t('welcome')}</Text>
      <Button
        onPress={() => {
          navigation.navigate('todo');
        }}
        title="ToDo"
      />
      <Button
        onPress={() => {
          navigation.navigate('finder');
        }}
        title="Finder"
      />
    </View>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //load initial data
    dispatch(loadFriends());
    dispatch(loadTodos());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name={'home'}
          component={HomeScreen}
          options={{ title: i18n.t('home.nav_title') }}
        />
        <Stack.Screen
          name={'todo'}
          component={TodoFriendsListScreen}
          options={{ title: 'TODO' }}
        />
        <Stack.Screen
          name={'todo_detail'}
          component={TodoFriendDetail}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name={'finder'}
          component={HomeScreen}
          options={{ title: 'FINDER' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ProvidersWrapper = () => (
  <PersistGate persistor={persistor} loading={<Text>loading</Text>}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);

export default ProvidersWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
