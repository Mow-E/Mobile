import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from './components/layout/LayoutAndNavigation';
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
import {AppColorMode, AppColorModeContext} from './hooks/useAppColorMode';
import StatusBar from './components/layout/StatusBar';

/**
 * The Mow-E Mobile app. Renders the complete application.
 */
function App(): JSX.Element {
  const [activeMowerConnection, setActiveMowerConnection] =
    useState<MowerConnection | null>(null);
  const [availableMowerConnections, setAvailableMowerConnections] = useState<
    Map<string, MowerConnection>
  >(new Map<string, MowerConnection>());
  const [showablePathTimeDuration, setShowablePathTimeDuration] =
    useState<ShowablePathTimeDuration>(ShowablePathTimeDuration.h24);
  const [mowerMode, setMowerMode] = useState<MowerMode>('automatic');
  const [appColorMode, setAppColorMode] = useState<AppColorMode>('auto');

  useEffect(() => {
    startBluetoothService();
  }, []);

  useEffect(() => {
    const listeners = addBluetoothServiceListeners(
      connection => {
        setAvailableMowerConnections(
          prevState =>
            new Map<string, MowerConnection>(
              prevState.set(connection.bluetoothInfos!.id, connection),
            ),
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
      <AppColorModeContext.Provider
        value={{
          appColorMode,
          setAppColorMode,
        }}>
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
                <StatusBar />
                <LayoutAndNavigation />
              </ShowablePathTimeDurationContext.Provider>
            </MowerModeContext.Provider>
          </ActiveMowerConnectionContext.Provider>
        </AvailableMowerConnectionsContext.Provider>
      </AppColorModeContext.Provider>
    </NavigationContainer>
  );
}

export default App;
