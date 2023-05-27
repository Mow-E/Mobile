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
import {ActiveMowerConnectionContext} from './hooks/useActiveMowerConnection';
import {AvailableMowerConnectionsContext} from './hooks/useAvailableMowerConnections';
import {
  MowingSessionsToShowInHistory,
  MowingSessionsToShowInHistoryContext,
} from './hooks/useMowingSessionsToShowInHistory';
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
  MOWING_SESSIONS_TO_SHOW_IN_HISTORY_STORAGE_KEY,
} from './hooks/useStorageService';
import {useTranslation} from 'react-i18next';
import {CurrentUserContext} from './hooks/useCurrentUser';
import LoginPage from './pages/LoginPage';
import LoadingOverlay from './components/common/LoadingOverlay';
import {
  API_TEST_URL,
  createWebSocketClient,
  fetchWithAuthorization,
} from './services/api';
import MowerConnection from './models/MowerConnection';
import CurrentUser from './models/CurrentUser';
import MowerHistoryEvent from './models/MowerHistoryEvent';
import {ApiWebSocketContext} from './hooks/useApiWebSocket';
import {ActivationState, Client} from '@stomp/stompjs';
import {
  getLatestSessionId,
  parseMowerHistoryEventFromWebSocketMessageBody,
} from './services/mower-history-event';
import {MowerHistoryEventsContext} from './hooks/useMowerHistoryEvents';

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
  const [sessionsToShow, setSessionsToShow] =
    useState<MowingSessionsToShowInHistory>(
      MowingSessionsToShowInHistory.latestSession,
    );
  const [mowerMode, setMowerMode] = useState<MowerMode>('automatic');
  const [appColorMode, setAppColorMode] = useState<AppColorMode>('auto');
  const [errorState, setErrorState] = useState<ErrorState>(null);
  const [loadingStoredData, setLoadingStoredData] = useState<boolean>(false);
  const [mowerHistoryEvents, setMowerHistoryEvents] = useState<
    Map<string, MowerHistoryEvent>
  >(new Map<string, MowerHistoryEvent>());
  const [mowerEventsFromWebSocket, setMowerEventsFromWebSocket] = useState<
    Map<string, MowerHistoryEvent>
  >(new Map<string, MowerHistoryEvent>());
  const [apiWebSocket, setApiWebSocket] = useState<Client | null>(null);
  const [webSocketConnectionAlive, setWebSocketConnectionAlive] =
    useState<boolean>(false);
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
          MOWING_SESSIONS_TO_SHOW_IN_HISTORY_STORAGE_KEY,
          MowingSessionsToShowInHistory.latestSession,
          true,
        ),
      )
      .then(setSessionsToShow)
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

        setApiWebSocket(prevState => {
          if (prevState !== null) {
            prevState.deactivate();
          }

          return null;
        });
      },
      () => {
        setAvailableMowerConnections(
          new Map<string, MowerConnection>(foundMowers),
        );
      },
    );

    return () => {
      removeBluetoothServiceListeners(listeners);
    };
  }, []);

  useEffect(() => {
    if (apiWebSocket === null) {
      setWebSocketConnectionAlive(false);
    }
  }, [apiWebSocket]);

  const handleSessionsToShowChange = useCallback<
    (newSessionsToShow: MowingSessionsToShowInHistory) => Promise<void>
  >(
    async newSessionsToShow => {
      setSessionsToShow(newSessionsToShow);
      await storageService.store(
        MOWING_SESSIONS_TO_SHOW_IN_HISTORY_STORAGE_KEY,
        newSessionsToShow,
      );
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

      if (user === null) {
        setApiWebSocket(prevState => {
          if (prevState !== null) {
            prevState.deactivate();
          }

          return null;
        });
      }
    },
    [storageService],
  );

  const currentUserContextValue = useMemo(
    () => ({currentUser, setCurrentUser: handleCurrentUserChange}),
    [currentUser, handleCurrentUserChange],
  );

  const handleActiveMowerConnectionChange = useCallback<
    (newConnection: MowerConnection | null) => void
  >(
    newConnection => {
      if (newConnection === null) {
        setApiWebSocket(prevState => {
          if (prevState !== null) {
            prevState.deactivate();
          }

          return null;
        });
      } else if (currentUser !== null) {
        const webSocket = createWebSocketClient(currentUser.authorizationToken);

        webSocket.onConnect = function () {
          const url = `/mower/${newConnection.id}/queue/coordinate`;
          setMowerEventsFromWebSocket(new Map<string, MowerHistoryEvent>());

          webSocket.subscribe(url, frame => {
            setMowerEventsFromWebSocket(prevState => {
              const latestSessionId = getLatestSessionId(
                Array.from(prevState.values()),
              );
              const event = parseMowerHistoryEventFromWebSocketMessageBody(
                frame.body,
                latestSessionId,
              );
              console.debug('[websocket] new mower event received', event);

              return new Map<string, MowerHistoryEvent>(
                prevState.set(`${event.mowerId}-${event.time}`, event),
              );
            });
          });

          console.log(`[websocket] subscribed to stomp topic ${url}`);
        };
        webSocket.onStompError = function (frame) {
          console.error('[websocket]', frame.headers.message, frame.body);
          setErrorState(frame.headers.message);
        };
        webSocket.onChangeState = state => {
          console.log(`[websocket] onChangeState ${state}`);
          setWebSocketConnectionAlive(state === ActivationState.ACTIVE);
        };
        webSocket.activate();

        setApiWebSocket(webSocket);
      }

      setActiveMowerConnection(newConnection);
    },
    [currentUser],
  );

  const allEvents = useMemo<MowerHistoryEvent[]>(() => {
    const events = mowerHistoryEvents;
    mowerEventsFromWebSocket.forEach(event =>
      events.set(`${event.mowerId}-${event.time}`, event),
    );

    return Array.from(events.values());
  }, [mowerHistoryEvents, mowerEventsFromWebSocket]);

  const handleMowerHistoryEventsChange = useCallback<
    (newEvents: MowerHistoryEvent[]) => void
  >(
    newEvents =>
      setMowerHistoryEvents(
        new Map<string, MowerHistoryEvent>(
          newEvents.map(event => [`${event.mowerId}-${event.time}`, event]),
        ),
      ),
    [],
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
                    setActiveConnection: handleActiveMowerConnectionChange,
                  }}>
                  <MowerModeContext.Provider
                    value={{mowerMode, setMowerMode: handleMowerModeChange}}>
                    <MowingSessionsToShowInHistoryContext.Provider
                      value={{
                        sessionsToShow,
                        setSessionsToShow: handleSessionsToShowChange,
                      }}>
                      <MowerHistoryEventsContext.Provider
                        value={{
                          events: allEvents,
                          setEvents: handleMowerHistoryEventsChange,
                        }}>
                        <ApiWebSocketContext.Provider
                          value={{
                            apiWebSocket,
                            webSocketConnectionAlive,
                            setApiWebSocket,
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
                        </ApiWebSocketContext.Provider>
                      </MowerHistoryEventsContext.Provider>
                    </MowingSessionsToShowInHistoryContext.Provider>
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
