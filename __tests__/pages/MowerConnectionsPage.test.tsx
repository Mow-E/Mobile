import 'react-native';
import React from 'react';
import MowerConnectionsPage from '../../src/pages/MowerConnectionsPage';

// Note: test renderer must be required after react-native.
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ActiveMowerConnectionContext} from '../../src/hooks/useActiveMowerConnection';
import {AvailableMowerConnectionsContext} from '../../src/hooks/useAvailableMowerConnections';
import {mockBluetoothService, setToDarkMode} from '../../jest/utils';
import MowerConnection from '../../src/models/MowerConnection';
import {CurrentUserContext} from '../../src/hooks/useCurrentUser';
import CurrentUser from '../../src/models/CurrentUser';

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
  };

  const {getByText, getAllByText, getByTestId} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{activeConnection: connection, setActiveConnection: () => {}}}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  // Name should be present as active connection
  expect(getByText(connection.name)).toBeTruthy();

  act(() => {
    fireEvent(getByTestId('openActiveConnectionInfo'), 'press');
  });

  expect(getByText('Back')).toBeTruthy();
  // Name should be present as page title
  expect(getAllByText(connection.name)).toHaveLength(1);
});

it('renders no info button for the active connection if there is none', () => {
  const {queryByTestId} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{activeConnection: null, setActiveConnection: () => {}}}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  expect(queryByTestId('openActiveConnectionInfo')).toBeFalsy();
});

it('selects available connection as active when pressed', () => {
  let activeConnection: MowerConnection | null = null;
  const availableConnections: Map<string, MowerConnection> = new Map<
    string,
    MowerConnection
  >();
  availableConnections.set('foo', {
    name: 'The Foo Mowers',
    id: 'foo',
    password: 'foo',
  });
  availableConnections.set('bar', {
    name: 'Bar and Mow',
    id: 'bar',
    password: 'bar',
  });

  mockBluetoothService({
    connect: async connection => {
      return new Promise(resolve =>
        setTimeout(() => {
          activeConnection = connection;
          resolve(connection);
        }, 1_000),
      );
    },
  });

  const currentUser: CurrentUser = {
    authorizationToken: 'footoken',
  };

  const {getByText} = render(
    <NavigationContainer>
      <CurrentUserContext.Provider
        value={{currentUser, setCurrentUser: () => {}}}>
        <AvailableMowerConnectionsContext.Provider
          value={{availableConnections, setAvailableConnections: () => {}}}>
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
      </CurrentUserContext.Provider>
    </NavigationContainer>,
  );

  expect(activeConnection).toBeNull();

  act(() => {
    fireEvent(getByText('The Foo Mowers'), 'press');
  });

  // Connection is loading
  expect(activeConnection).toBeNull();
  expect(getByText('Connecting...')).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1_000);
  });

  expect(activeConnection).toBe(availableConnections.get('foo'));
});

it('disconnects active connection when disconnect button is pressed', () => {
  const connection: MowerConnection = {
    id: 'foo',
    name: 'The Foo Mowers',
    password: 'foo',
  };

  let activeConnection: MowerConnection | null = connection;

  mockBluetoothService({
    disconnect: async () => {
      return new Promise(resolve =>
        setTimeout(() => {
          activeConnection = null;
          resolve();
        }, 1_000),
      );
    },
  });

  const {getByTestId, getByText} = render(
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

  act(() => {
    fireEvent(getByTestId('openActiveConnectionInfo'), 'press');
  });

  waitFor(() => {
    fireEvent(getByTestId('disconnectActiveMowerButton'), 'press');
  });

  // Disconnection is loading
  expect(activeConnection).toBe(connection);
  expect(getByText('Disconnecting...')).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1_000);
  });

  expect(activeConnection).toBeNull();
});

it('shows and hides mower password when show/hide button is pressed', () => {
  const activeConnection: MowerConnection = {
    id: 'foo',
    name: 'The Foo Mowers',
    password: 'foo-pass',
  };

  const {getByTestId, queryByText} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{
          activeConnection,
          setActiveConnection: () => {},
        }}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  act(() => {
    fireEvent(getByTestId('openActiveConnectionInfo'), 'press');
  });

  act(() => {
    fireEvent(getByTestId('showHidePasswordButton'), 'press');
  });

  expect(queryByText(activeConnection.password!)).toBeFalsy();
});

it('renders details page in dark mode', () => {
  setToDarkMode();

  const activeConnection: MowerConnection = {
    id: 'foo',
    name: 'The Foo Mowers',
    password: 'foo-pass',
  };

  const {getByTestId} = render(
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{
          activeConnection,
          setActiveConnection: () => {},
        }}>
        <MowerConnectionsPage />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>,
  );

  act(() => {
    fireEvent(getByTestId('openActiveConnectionInfo'), 'press');
  });
});
