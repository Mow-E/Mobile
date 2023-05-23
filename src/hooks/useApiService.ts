import {useCallback} from 'react';
import {
  fetchWithAuthorization,
  LOGIN_URL,
  MOWER_HISTORY_URL,
  REGISTER_URL,
} from '../services/api';
import useCurrentUser from './useCurrentUser';
import useErrorState from './useErrorState';

export const NO_TOKEN = '';

/**
 * A state a mower can have had in a mower history event.
 */
export enum MowerHistoryEventMowerState {
  /** The mower has started at the event. */
  Start = 0,
  /** The mower was working at the event. */
  Working = 1,
  /** The mower has stopped at the event. */
  Stop = 2,
  /** The mower has had an error at the event. */
  Error = 3,
  /** The mower has avoided a collision at the event. */
  Collision = 4,
  /** The mower has hit a border at the event. */
  Border = 5,
}

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

/**
 * An event that has been reported by a mower.
 * It always contains its position and state, with some other data.
 */
type MowerHistoryEvent = {
  /**
   * The unique id of the event.
   */
  id: number;
  /**
   * The id of the mowing session the event occured in.
   */
  sessionId: number;
  /**
   * The id of the mower that reported the event.
   */
  mowerId: string;
  /**
   * The x position the mower was at when the event occured.
   */
  x: number;
  /**
   * The y position the mower was at when the event occured.
   */
  y: number;
  /**
   * The angle the mower had when the event occured.
   * Its a number in degrees (0.0 .. 360.0).
   */
  z: number;
  /**
   * The time the event occured at (as a timestamp).
   */
  time: number;
  /**
   * The state the mower had when the event occured.
   */
  state: MowerHistoryEventMowerState;
  /**
   * Optional id of an image that is associated with the event, e.g. an image the mower took when avoiding a collision.
   */
  imageId: string | null;
  /**
   * Extra data for the event.
   * If the event contains an image (imageId !== null), this field contains classification results for the image, or an empty string otherwise.
   *
   * The classification results are a map of label (string) to its probability.
   * E.g.: "{Foo=0.92141,Bar=0.125151,Foo Bar=0.2718283}"
   */
  extra: string;
};

type MowerHistoryFetchResult =
  | MowerHistoryEvent[]
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
            '[api] loaded mower history event data successfully',
            data,
          );
          return data as MowerHistoryEvent[];
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
