import {createContext, useContext} from 'react';

export enum MowingSessionsToShowInHistory {
  latestSession = 'latest',
  lastThreeSessions = 'last_three',
  lastTenSessions = 'last_ten',
  allSessions = 'all',
}

interface MowingSessionsToShowInHistoryContextType {
  sessionsToShow: MowingSessionsToShowInHistory;
  setSessionsToShow?: (sessionsToShow: MowingSessionsToShowInHistory) => void;
}

export const MowingSessionsToShowInHistoryContext =
  createContext<MowingSessionsToShowInHistoryContextType>({
    sessionsToShow: MowingSessionsToShowInHistory.latestSession,
  });
const useMowingSessionsToShowInHistory = () =>
  useContext(MowingSessionsToShowInHistoryContext);

export default useMowingSessionsToShowInHistory;
