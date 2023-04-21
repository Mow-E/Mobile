import 'react-native';
import React from 'react';
import MowerConnectionsPage from '../../src/pages/MowerConnectionsPage';

// Note: test renderer must be required after react-native.
import {fireEvent, render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  ActiveMowerConnectionContext,
  MowerConnection,
} from '../../src/hooks/useActiveMowerConnection';
import {AvailableMowerConnectionsContext} from '../../src/hooks/useAvailableMowerConnections';

it('renders correctly', () => {
  render(
    <NavigationContainer>
      <MowerConnectionsPage />
    </NavigationContainer>,
  );
});

it('renders details page of active connection with connection name in header', () => {
  const connection: MowerConnection = {id: 'foo', name: 'The Test Mower'};

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
  // Name should be present as page title, and for now as dummy page content
  expect(getAllByText(connection.name)).toHaveLength(2);
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
    },
    {
      name: 'bar',
      id: 'bar',
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

  fireEvent(getByText('foo'), 'press');

  expect(activeConnection).toBe(availableConnections[0]);
});

it('renders details page of inactive connection with connection name in header', () => {
  const availableConnections: MowerConnection[] = [
    {
      name: 'foo',
      id: 'foo',
    },
    {
      name: 'bar',
      id: 'bar',
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
  expect(getByText('foo')).toBeTruthy();

  fireEvent(getByTestId('openConnectionInfo-foo'), 'press');

  expect(getByText('Back')).toBeTruthy();
  // Name should be present as page title, and for now as dummy page content
  expect(getAllByText('foo')).toHaveLength(2);
});
