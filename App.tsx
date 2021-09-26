import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { EntityId } from '@reduxjs/toolkit';
import I18n from 'i18n-js';
import { Button, Heading, NativeBaseProvider, Stack } from 'native-base';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FinderFriendDetail } from './src/features/finder/FinderFriendDetail';
import { FinderFriendsListScreen } from './src/features/finder/FinderFriendsListScreen';
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
  finder_detail: { id: EntityId; title: string };
};

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Stack flex={1}>
      <Heading textAlign="center" my="10" fontSize="3xl" fontWeight="extrabold">
        Friends Tool
      </Heading>

      <Heading textAlign="center" fontSize="5xl" mb="10">
        😊😬😎
      </Heading>

      <Heading textAlign="center" fontSize="5xl">
        🔨🧰🔧
      </Heading>
      <Stack justifyContent="center" alignItems="center" flex={1}>
        <Button
          size="md"
          mb="10"
          onPress={() => {
            navigation.navigate('todo');
          }}
        >
          ToDo
        </Button>
        <Button
          size="md"
          onPress={() => {
            navigation.navigate('finder');
          }}
        >
          Finder
        </Button>
      </Stack>
    </Stack>
  );
};

const NavigationStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //load initial data
    dispatch(loadFriends());
    dispatch(loadTodos());
  }, []);

  return (
    <NavigationContainer>
      <NavigationStack.Navigator initialRouteName="home">
        <NavigationStack.Screen
          name={'home'}
          component={HomeScreen}
          options={{ title: I18n.t('home.nav_title') }}
        />
        <NavigationStack.Screen
          name={'todo'}
          component={TodoFriendsListScreen}
          options={{ title: 'TODO' }}
        />
        <NavigationStack.Screen
          name={'todo_detail'}
          component={TodoFriendDetail}
          options={({ route }) => ({ title: route.params.title })}
        />
        <NavigationStack.Screen
          name={'finder'}
          component={FinderFriendsListScreen}
          options={{ title: 'FINDER' }}
        />
        <NavigationStack.Screen
          name={'finder_detail'}
          component={FinderFriendDetail}
          options={() => ({ title: '' })}
        />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};

// needed for testing
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const ProvidersWrapper = () => (
  <PersistGate persistor={persistor} loading={<Text>loading</Text>}>
    <Provider store={store}>
      <NativeBaseProvider initialWindowMetrics={inset}>
        <App />
      </NativeBaseProvider>
    </Provider>
  </PersistGate>
);

export default ProvidersWrapper;
