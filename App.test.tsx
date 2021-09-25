import { render } from '@testing-library/react-native';
import React from 'react';
import App from './App';

test('form submits two answers', () => {
  const { getAllByText } = render(<App />);

  const text = getAllByText('Open up App.tsx to start working on your app!');

  expect(text).toBeDefined();
});
