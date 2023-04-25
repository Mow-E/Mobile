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
    serialNumber: 463208951,
    modelName: 'Automower 310 Mark II',
    modelNumber: 'AM5369841',
  },
  {
    id: 1,
    name: 'Shaun the Sheep',
    serialNumber: 800341763,
    modelName: 'Automower 305',
    modelNumber: 'AM2311702',
  },
  {
    id: 2,
    name: 'David Mowie',
    serialNumber: 18604774,
    modelName: 'Automower 315 Mark II',
    modelNumber: 'AM5103492',
  },
  {
    id: 3,
    name: 'Garden Gangster',
    serialNumber: 563170988,
    modelName: 'Automower 430X NERA',
    modelNumber: 'AM4369403',
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
