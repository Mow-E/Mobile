import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from './components/layout/LayoutAndNavigation';
import './i18n.config';
import {
  addBluetoothServiceListeners,
  handleAndroidPermissions,
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
import ErrorOverlay from './components/common/ErrorOverlay';
import {ErrorState, ErrorStateContext} from './hooks/useErrorState';

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
  const [errorState, setErrorState] = useState<ErrorState>(null);

  useEffect(() => {
    handleAndroidPermissions()
      .then(startBluetoothService)
      .catch(reason => {
        console.error(reason);
        setErrorState(reason);
      });
  }, []);

  useEffect(() => {
    const foundMowers = new Map<string, MowerConnection>();

    const listeners = addBluetoothServiceListeners(
      connection => {
        foundMowers.set(connection.bluetoothInfos!.id, connection);
      },
      () => {
        setAvailableMowerConnections(foundMowers);
      },
    );

    return () => {
      removeBluetoothServiceListeners(listeners);
    };
  }, []);

  try {
    return (
      <NavigationContainer>
        <ErrorStateContext.Provider value={{errorState, setErrorState}}>
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
                    <ErrorOverlay
                      text={errorState ?? ''}
                      visible={errorState !== null}
                      onClose={() => setErrorState(null)}
                    />
                  </ShowablePathTimeDurationContext.Provider>
                </MowerModeContext.Provider>
              </ActiveMowerConnectionContext.Provider>
            </AvailableMowerConnectionsContext.Provider>
          </AppColorModeContext.Provider>
        </ErrorStateContext.Provider>
      </NavigationContainer>
    );
  } catch (e: unknown) {
    console.error(e);

    if (e instanceof Error) {
      setErrorState(e.message);

      return (
        <ErrorOverlay
          text={e.message}
          visible
          onClose={() => setErrorState(null)}
        />
      );
    }

    return <></>;
  }
}

export default App;
