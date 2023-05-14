import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from './components/layout/LayoutAndNavigation';
import useIsInDarkMode from './hooks/useIsInDarkMode';
import './i18n.config';
import {
  addBluetoothServiceListeners,
  removeBluetoothServiceListeners,
  startBluetoothService,
} from './services/bluetooth';
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
 * The Mow-E Mobile app. Renders the complete application.
 */
function App(): JSX.Element {
  const [activeMowerConnection, setActiveMowerConnection] =
    useState<MowerConnection | null>(null);
  const [availableMowerConnections, setAvailableMowerConnections] = useState<
    Map<string, MowerConnection>
  >(new Map<string, MowerConnection>());
  const isDarkMode = useIsInDarkMode();
  const [showablePathTimeDuration, setShowablePathTimeDuration] =
    useState<ShowablePathTimeDuration>(ShowablePathTimeDuration.h24);
  const [mowerMode, setMowerMode] = useState<MowerMode>('automatic');

  useEffect(() => {
    startBluetoothService();
  }, []);

  useEffect(() => {
    const listeners = addBluetoothServiceListeners(
      connection => {
        setAvailableMowerConnections(prevState =>
          prevState.set(connection.bluetoothInfos!.id, connection),
        );
      },
      () => {},
    );

    return () => {
      removeBluetoothServiceListeners(listeners);
    };
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
