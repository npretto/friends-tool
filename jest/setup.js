/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// needed for `ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.`
jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: (props) => props.children,
}));
