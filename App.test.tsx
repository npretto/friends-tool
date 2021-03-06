import { render } from '@testing-library/react-native';
import React from 'react';
import App from './App';

test('app shows home', async () => {
  const { getAllByText } = render(<App />);

  const text = getAllByText('Friends Tool');

  expect(text).toBeDefined();
});
