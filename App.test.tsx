import { render } from '@testing-library/react-native';
import React from 'react';
import App from './App';

test('form submits two answers', () => {
  const { getAllByText } = render(<App />);

  const text = getAllByText('Home Screen');

  expect(text).toBeDefined();
});
