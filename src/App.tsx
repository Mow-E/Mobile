import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from './components/layout/LayoutAndNavigation';
import useIsInDarkMode from './hooks/useIsInDarkMode';
import './i18n.config';
import {startBluetoothService} from './services/bluetooth';
import {
  ActiveMowerConnectionContext,
  MowerConnection,
} from './hooks/useActiveMowerConnection';
import {AvailableMowerConnectionsContext} from './hooks/useAvailableMowerConnections';
import {
  ShowablePathTimeDuration,
  ShowablePathTimeDurationContext,
} from './hooks/useShowablePathTimeDuration';
import {MowerMode, MowerModeContext} from './hooks/useMowerMode';

/**
 * Some dummy mower connections to use until the actual connections can be fetched.
 */
const DUMMY_AVAILABLE_CONNECTIONS: MowerConnection[] = [
  {
    id: 'b177106d-b443-464b-8ce2-b381f3d9201e',
    name: 'Mow-E',
    password: 'mow-e-123',
    mowerInfos: {
      serialNumber: 463208951,
      modelName: 'Automower 310 Mark II',
      modelNumber: 'AM5369841',
    },
  },
  {
    id: 'deba181e-3262-4594-a26c-b544ca281589',
    name: 'Shaun the Sheep',
    password: 'mähhh1337',
    mowerInfos: {
      serialNumber: 800341763,
      modelName: 'Automower 305',
      modelNumber: 'AM2311702',
    },
  },
  {
    id: 'b8e458fb-8a2f-475f-85ea-c1913e76dde8',
    name: 'David Mowie',
    password: 'mowie42',
    mowerInfos: {
      serialNumber: 18604774,
      modelName: 'Automower 315 Mark II',
      modelNumber: 'AM5103492',
    },
  },
  {
    id: '32cc7f51-17ee-4ced-97ca-c3f42ddc590c',
    name: 'Garden Gangster',
    password: 'theyseemerollin',
    mowerInfos: {
      serialNumber: 563170988,
      modelName: 'Automower 430X NERA',
      modelNumber: 'AM4369403',
    },
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
  const [showablePathTimeDuration, setShowablePathTimeDuration] =
    useState<ShowablePathTimeDuration>(ShowablePathTimeDuration.h24);
  const [mowerMode, setMowerMode] = useState<MowerMode>('automatic');

  useEffect(() => {
    startBluetoothService();
  }, []);

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
          <MowerModeContext.Provider value={{mowerMode, setMowerMode}}>
            <ShowablePathTimeDurationContext.Provider
              value={{
                timeDuration: showablePathTimeDuration,
                setTimeDuration: setShowablePathTimeDuration,
              }}>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <LayoutAndNavigation />
            </ShowablePathTimeDurationContext.Provider>
          </MowerModeContext.Provider>
        </ActiveMowerConnectionContext.Provider>
      </AvailableMowerConnectionsContext.Provider>
    </NavigationContainer>
  );
}

export default App;
