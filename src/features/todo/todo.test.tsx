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

  it('should add a new todo', async () => {
    const todoTitle = 'Todo that will be added';

    const { queryByText, getByTestId } = render(<App />);

    expect(queryByText(todoTitle)).toBeFalsy();
    const button = queryByText('ToDo');
    fireEvent.press(button);

    const friendItem = queryByText('Kurtis Weissnat');

    fireEvent.press(friendItem);

    const input = getByTestId('todo_title_input');

    fireEvent.changeText(input, todoTitle);

    const addButton = queryByText(/add todo/i);
    fireEvent.press(addButton);

    expect(queryByText(todoTitle)).toBeTruthy();

    expect(input.props.value).toBe('');
  });
});
