import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import useStorageService, {
  APP_COLOR_MODE_STORAGE_KEY,
  LANGUAGE_STORAGE_KEY,
  LOGGED_IN_USER_STORAGE_KEY,
  MOWER_MODE_STORAGE_KEY,
  SHOWABLE_TIME_DURATION_STORAGE_KEY,
} from './hooks/useStorageService';
import {useTranslation} from 'react-i18next';
import {CurrentUser, CurrentUserContext} from './hooks/useCurrentUser';
import LoginPage from './pages/LoginPage';
import LoadingOverlay from './components/common/LoadingOverlay';
import {API_TEST_URL, fetchWithAuthorization} from './services/api';

/**
 * The Mow-E Mobile app. Renders the complete application.
 */
function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
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
  const [loadingStoredData, setLoadingStoredData] = useState<boolean>(false);
  const storageService = useStorageService();
  const {t, i18n} = useTranslation();

  // Handle initial bluetooth permissions and start service at app startup
  useEffect(() => {
    handleAndroidPermissions()
      .then(startBluetoothService)
      .catch(reason => {
        console.error(reason);
        setErrorState(reason);
      });
  }, []);

  // Load previously stored settings and logged-in user at app startup
  useEffect(() => {
    setLoadingStoredData(true);

    storageService
      .get(APP_COLOR_MODE_STORAGE_KEY, 'auto', true)
      .then(setAppColorMode)
      .then(() => storageService.get(LANGUAGE_STORAGE_KEY, i18n.language, true))
      .then(i18n.changeLanguage)
      .then(() => storageService.get(LOGGED_IN_USER_STORAGE_KEY))
      .then(async (storedUser: CurrentUser | null) => {
        if (storedUser === null) {
          return null;
        }

        // Check that stored token is still valid
        const result = await fetchWithAuthorization(
          API_TEST_URL,
          {},
          'GET',
          storedUser.authorizationToken,
        );

        return result.ok ? storedUser : null;
      })
      .then(setCurrentUser)
      .then(() =>
        storageService.get(
          SHOWABLE_TIME_DURATION_STORAGE_KEY,
          ShowablePathTimeDuration.h24,
          true,
        ),
      )
      .then(setShowablePathTimeDuration)
      .then(() => storageService.get(MOWER_MODE_STORAGE_KEY, 'automatic', true))
      .then(setMowerMode)
      .finally(() => setLoadingStoredData(false));
    // This should only happen at the start of the app (once), so no hook dependencies here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const foundMowers = new Map<string, MowerConnection>();

    const listeners = addBluetoothServiceListeners(
      connection => {
        foundMowers.set(connection.bluetoothInfos!.id, connection);
      },
      id => {
        setActiveMowerConnection(prevState =>
          prevState?.bluetoothInfos?.id === id ? null : prevState,
        );
      },
      () => {
        setAvailableMowerConnections(foundMowers);
      },
    );

    return () => {
      removeBluetoothServiceListeners(listeners);
    };
  }, []);

  const handleShowableTimeDurationChange = useCallback<
    (duration: ShowablePathTimeDuration) => Promise<void>
  >(
    async duration => {
      setShowablePathTimeDuration(duration);
      await storageService.store(SHOWABLE_TIME_DURATION_STORAGE_KEY, duration);
    },
    [storageService],
  );

  const handleAppColorModeChange = useCallback<
    (mode: AppColorMode) => Promise<void>
  >(
    async mode => {
      setAppColorMode(mode);
      await storageService.store(APP_COLOR_MODE_STORAGE_KEY, mode);
    },
    [storageService],
  );

  const handleMowerModeChange = useCallback<(mode: MowerMode) => Promise<void>>(
    async mode => {
      setMowerMode(mode);
      await storageService.store(MOWER_MODE_STORAGE_KEY, mode);
    },
    [storageService],
  );

  const handleCurrentUserChange = useCallback(
    async (user: CurrentUser | null) => {
      setCurrentUser(user);
      await storageService.store(LOGGED_IN_USER_STORAGE_KEY, user);
    },
    [storageService],
  );

  const currentUserContextValue = useMemo(
    () => ({currentUser, setCurrentUser: handleCurrentUserChange}),
    [currentUser, handleCurrentUserChange],
  );

  if (currentUser === null) {
    return (
      <NavigationContainer>
        <CurrentUserContext.Provider value={currentUserContextValue}>
          <ErrorStateContext.Provider value={{errorState, setErrorState}}>
            <AppColorModeContext.Provider
              value={{appColorMode, setAppColorMode: handleAppColorModeChange}}>
              <LoadingOverlay
                text={t('routes.app.loading')!}
                visible={loadingStoredData}
              />
              <StatusBar />
              <LoginPage />
              <ErrorOverlay
                text={errorState ?? ''}
                visible={errorState !== null}
                onClose={() => setErrorState(null)}
              />
            </AppColorModeContext.Provider>
          </ErrorStateContext.Provider>
        </CurrentUserContext.Provider>
      </NavigationContainer>
    );
  }

  try {
    return (
      <NavigationContainer>
        <CurrentUserContext.Provider value={currentUserContextValue}>
          <ErrorStateContext.Provider value={{errorState, setErrorState}}>
            <AppColorModeContext.Provider
              value={{
                appColorMode,
                setAppColorMode: handleAppColorModeChange,
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
                  <MowerModeContext.Provider
                    value={{mowerMode, setMowerMode: handleMowerModeChange}}>
                    <ShowablePathTimeDurationContext.Provider
                      value={{
                        timeDuration: showablePathTimeDuration,
                        setTimeDuration: handleShowableTimeDurationChange,
                      }}>
                      <LoadingOverlay
                        text={t('routes.app.loading')!}
                        visible={loadingStoredData}
                      />
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
        </CurrentUserContext.Provider>
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
