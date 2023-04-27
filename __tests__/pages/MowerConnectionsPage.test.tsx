import 'react-native';
import React from 'react';
import MowerConnectionsPage from '../../src/pages/MowerConnectionsPage';

// Note: test renderer must be required after react-native.
import {act, fireEvent, render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  ActiveMowerConnectionContext,
  MowerConnection,
} from '../../src/hooks/useActiveMowerConnection';
import {AvailableMowerConnectionsContext} from '../../src/hooks/useAvailableMowerConnections';
import {setToDarkMode} from '../../jest/utils';

it('renders correctly', () => {
  render(
    <NavigationContainer>
      <MowerConnectionsPage />
    </NavigationContainer>,
  );
});

it('renders details page of active connection with connection name in header', () => {
  const connection: MowerConnection = {
    id: 'foo',
    name: 'The Test Mower',
    password: 'foo',
    modelName: 'foo',
    modelNumber: 'foo',
    serialNumber: 42,
  };

  const {getByText, getAllByText, getByTestId} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{activeConnection: connection}}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  // Name should be present as active connection
  expect(getByText(connection.name)).toBeTruthy();

  fireEvent(getByTestId('openActiveConnectionInfo'), 'press');

  expect(getByText('Back')).toBeTruthy();
  // Name should be present as page title
  expect(getAllByText(connection.name)).toHaveLength(1);
});

it('renders no info button for the active connection if there is none', () => {
  const {queryByTestId} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider value={{activeConnection: null}}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  expect(queryByTestId('openActiveConnectionInfo')).toBeFalsy();
});

it('selects available connection as active when pressed', () => {
  let activeConnection: MowerConnection | null = null;
  const availableConnections: MowerConnection[] = [
    {
      name: 'foo',
      id: 'foo',
      password: 'foo',
      modelName: 'foo',
      modelNumber: 'foo',
      serialNumber: 42,
    },
    {
      name: 'bar',
      id: 'bar',
      password: 'bar',
      modelName: 'bar',
      modelNumber: 'bar',
      serialNumber: 17,
    },
  ];

  const {getByText} = render(
    <NavigationContainer>
      <AvailableMowerConnectionsContext.Provider value={{availableConnections}}>
        <ActiveMowerConnectionContext.Provider
          value={{
            activeConnection,
            setActiveConnection: connection => {
              activeConnection = connection;
            },
          }}>
          <MowerConnectionsPage />
        </ActiveMowerConnectionContext.Provider>
      </AvailableMowerConnectionsContext.Provider>
    </NavigationContainer>,
  );

  expect(activeConnection).toBeNull();

  act(() => {
    fireEvent(getByText('foo'), 'press');
  });

  // Connection is loading
  expect(activeConnection).toBeNull();
  expect(getByText('Connecting...')).toBeTruthy();

  act(() => {
    // Wait for connection to be established - for now just a dummy timeout
    // TODO: import time value - or mock bluetooth service?
    jest.advanceTimersByTime(3_000);
  });

  expect(activeConnection).toBe(availableConnections[0]);
});

it('disconnects active connection when disconnect button is pressed', () => {
  const connection: MowerConnection = {
    id: 'foo',
    name: 'The Foo Mowers',
    password: 'foo',
    modelName: 'foo',
    modelNumber: 'foo',
    serialNumber: 42,
  };

  let activeConnection: MowerConnection | null = connection;

  const {getByTestId} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{
          activeConnection,
          setActiveConnection: newConnection => {
            activeConnection = newConnection;
          },
        }}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  fireEvent(getByTestId('openActiveConnectionInfo'), 'press');
  fireEvent(getByTestId('disconnectActiveMowerButton'), 'press');

  expect(activeConnection).toBeNull();
});

it('shows and hides mower password when show/hide button is pressed', () => {
  const activeConnection: MowerConnection = {
    id: 'foo',
    name: 'The Foo Mowers',
    password: 'foo-pass',
    modelName: 'foo',
    modelNumber: 'foo',
    serialNumber: 42,
  };

  const {getByTestId, queryByText} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{
          activeConnection,
        }}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  fireEvent(getByTestId('openActiveConnectionInfo'), 'press');
  fireEvent(getByTestId('showHidePasswordButton'), 'press');

  expect(queryByText(activeConnection.password)).toBeFalsy();
});

it('renders details page in dark mode', () => {
  setToDarkMode();

  const activeConnection: MowerConnection = {
    id: 'foo',
    name: 'The Foo Mowers',
    password: 'foo-pass',
    modelName: 'foo',
    modelNumber: 'foo',
    serialNumber: 42,
  };

  const {getByTestId} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{
          activeConnection,
        }}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  fireEvent(getByTestId('openActiveConnectionInfo'), 'press');
});

it('renders details page of inactive connection with connection name in header', () => {
  const availableConnections: MowerConnection[] = [
    {
      name: 'The Foo Mowers',
      id: 'foo',
      password: 'foo',
      modelName: 'foo',
      modelNumber: 'foo',
      serialNumber: 42,
    },
    {
      name: 'Bar and Mow',
      id: 'bar',
      password: 'bar',
      modelName: 'bar',
      modelNumber: 'bar',
      serialNumber: 17,
    },
  ];

  const {getByText, getAllByText, getByTestId} = render(
    <NavigationContainer>
      <AvailableMowerConnectionsContext.Provider value={{availableConnections}}>
        <ActiveMowerConnectionContext.Provider
          value={{
            activeConnection: null,
          }}>
          <MowerConnectionsPage />
        </ActiveMowerConnectionContext.Provider>
      </AvailableMowerConnectionsContext.Provider>
    </NavigationContainer>,
  );

  // Name should be present as inactive connection
  expect(getByText('The Foo Mowers')).toBeTruthy();

  fireEvent(getByTestId('openConnectionInfo-foo'), 'press');

  expect(getByText('Back')).toBeTruthy();
  // Name should be present as page title
  expect(getAllByText('The Foo Mowers')).toHaveLength(1);
});
