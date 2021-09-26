import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import App from '../../../App';

describe('[TODO] friends list', () => {
  it('should display the friends name', () => {
    const { getByText } = render(<App />);

    const button = getByText('ToDo');
    fireEvent.press(button);

    expect(getByText('Leanne Graham')).toBeTruthy();
    expect(getByText('Ervin Howell')).toBeTruthy();
    expect(getByText('Clementine Bauch')).toBeTruthy();
  });
});

describe('[TODO] todos', () => {
  it('when I select a friend I should see my todos with them', () => {
    const { getByText } = render(<App />);

    const button = getByText('ToDo');
    fireEvent.press(button);

    const friendItem = getByText('Kurtis Weissnat');

    fireEvent.press(friendItem);

    expect(
      getByText('inventore aut nihil minima laudantium hic qui omnis')
    ).toBeTruthy();
  });
});
