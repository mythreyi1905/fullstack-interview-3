import React from 'react';
import { screen, render,  waitFor, getByTestId, queryByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/list of all people/i)).toBeInTheDocument();


});

test('list gets populated on initial load', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // const list = await screen.getByTestId('list');

  await waitFor(() => {
    expect(screen.getByTestId('listItem-0')).toBeInTheDocument()
  })

  
});
