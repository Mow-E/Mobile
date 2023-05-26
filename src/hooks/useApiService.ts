import {useCallback} from 'react';
import {
  fetchWithAuthorization,
  LOGIN_URL,
  MOWER_HISTORY_URL,
  REGISTER_URL,
} from '../services/api';
import useCurrentUser from './useCurrentUser';
import useErrorState from './useErrorState';
import MowerHistoryEvent from '../models/MowerHistoryEvent';

export const NO_TOKEN = '';

type LoginFetchResult =
  | {
      status: 'successful';
      token: string;
    }
  | {
      status: 'error';
      message: string;
    };

type RegisterFetchResult =
  | {
      status: 'successful';
      token: string;
    }
  | {
      status: 'error';
      reason: string;
    };

interface ApiMowerHistoryEvent extends MowerHistoryEvent {
  source: 'api';
}

type MowerHistoryFetchResult =
  | ApiMowerHistoryEvent[]
  | {status: 'error'; message: string};

/**
 * Provides functions to use the API.
 */
function useApiService() {
  const {currentUser} = useCurrentUser();
  const {setErrorState} = useErrorState();

  /**
   * Tries to perform a login with the provided credentials.
   * Resolves to the token on success, or an empty string on failure.
   */
  const login = useCallback<
    (username: string, password: string) => Promise<string>
  >(
    async (username, password) => {
      try {
        const response = await fetchWithAuthorization(
          LOGIN_URL,
          {
            username: username,
            password: password,
            // expiresInMins: 60, // optional
          },
          'POST',
          undefined,
        );
        const data: LoginFetchResult = await response.json();

        if (data.status === 'successful') {
          console.debug('[api] logged in successfully');
          return data.token;
        }

        console.error('[api] login unsuccessful', data.message);
        setErrorState(data.message);

        return NO_TOKEN;
      } catch (error) {
        console.error('[api] login unsuccessful', error);

        if (error instanceof Error) {
          setErrorState(error.message);
        }

        return NO_TOKEN;
      }
    },
    [setErrorState],
  );

  const register = useCallback<
    (username: string, password: string) => Promise<string>
  >(
    async (username, password) => {
      try {
        const response = await fetchWithAuthorization(
          REGISTER_URL,
          {
            username: username,
            password: password,
            // expiresInMins: 60, // optional
          },
          'POST',
          undefined,
        );
        const data: RegisterFetchResult = await response.json();

        if (data.status === 'successful') {
          console.debug('[api] registered in successfully');
          return data.token;
        }

        console.error('[api] registration unsuccessful', data.reason);
        setErrorState(data.reason);

        return NO_TOKEN;
      } catch (error) {
        console.error('[api] registration unsuccessful', error);

        if (error instanceof Error) {
          setErrorState(error.message);
        }

        return NO_TOKEN;
      }
    },
    [setErrorState],
  );

  const getMowerHistory = useCallback<
    (
      includeAllSessions?: boolean,
      specificSessionId?: number,
    ) => Promise<MowerHistoryEvent[]>
  >(
    async (includeAllSessions = true, specificSessionId) => {
      if (currentUser === null) {
        throw new Error('Not logged in');
      }

      const searchParams = new URLSearchParams();

      if (includeAllSessions) {
        searchParams.append('allSessions', 'true');
      }

      if (specificSessionId !== undefined) {
        searchParams.append('sessionId', specificSessionId.toString());
      }

      try {
        const response = await fetchWithAuthorization(
          `${MOWER_HISTORY_URL}?${searchParams}`,
          {},
          'GET',
          currentUser.authorizationToken,
        );
        const data: MowerHistoryFetchResult = await response.json();

        const isError = 'status' in data && data.status === 'error';

        if (!isError) {
          console.log(
            `[api] loaded mower history event data successfully (${
              (data as ApiMowerHistoryEvent[]).length
            } items)`,
          );
          return data as ApiMowerHistoryEvent[];
        } else {
          console.error(
            '[api] loading of mower history event data unsuccessful',
            data.message,
          );
          setErrorState(data.message);
        }

        return [];
      } catch (error) {
        console.error(
          '[api] loading of mower history event data unsuccessful',
          error,
        );

        if (error instanceof Error) {
          setErrorState(error.message);
        }

        return [];
      }
    },
    [setErrorState, currentUser],
  );

  return {
    login,
    register,
    getMowerHistory,
  };
}

export default useApiService;
