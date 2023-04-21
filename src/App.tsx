import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from './components/layout/LayoutAndNavigation';
import useIsInDarkMode from './hooks/useIsInDarkMode';
import './i18n.config';
import {
  ActiveMowerConnectionContext,
  MowerConnection,
} from './hooks/useActiveMowerConnection';
import {AvailableMowerConnectionsContext} from './hooks/useAvailableMowerConnections';

/**
 * Some dummy mower connections to use until the actual connections can be fetched.
 */
const DUMMY_AVAILABLE_CONNECTIONS: MowerConnection[] = [
  {
    id: 0,
    name: 'Mow-E',
  },
  {
    id: 1,
    name: 'Shaun the Sheep',
  },
  {
    id: 2,
    name: 'David Mowie',
  },
  {
    id: 3,
    name: 'Garden Gangster',
  },
];

/**
 * The Mow-E Mobile app. Renders the complete application.
 */
function App(): JSX.Element {
  const [activeMowerConnection, setActiveMowerConnection] =
    useState<MowerConnection | null>(null);
  const [availableMowerConnections, setAvailableMowerConnections] = useState<
    MowerConnection[]
  >(DUMMY_AVAILABLE_CONNECTIONS);
  const isDarkMode = useIsInDarkMode();

  return (
    <NavigationContainer>
      <AvailableMowerConnectionsContext.Provider
        value={{
          availableConnections: availableMowerConnections,
          setAvailableConnections: setAvailableMowerConnections,
        }}>
        <ActiveMowerConnectionContext.Provider
          value={{
            activeConnection: activeMowerConnection,
            setActiveConnection: setActiveMowerConnection,
          }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <LayoutAndNavigation />
        </ActiveMowerConnectionContext.Provider>
      </AvailableMowerConnectionsContext.Provider>
    </NavigationContainer>
  );
}

export default App;
