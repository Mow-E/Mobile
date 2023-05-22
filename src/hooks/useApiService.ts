import {useCallback} from 'react';
import {fetchWithAuthorization, LOGIN_URL, REGISTER_URL} from '../services/api';
import useErrorState from './useErrorState';

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

/**
 * Provides functions to use the API.
 */
function useApiService() {
  // The current user can be used here later on to check that a user/token
  // exists before making api calls that need authorization
  // const currentUser = useCurrentUser();
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
        console.log(data);

        if (data.status === 'successful') {
          return data.token;
        }

        console.error(data.message);
        setErrorState(data.message);

        return NO_TOKEN;
      } catch (error) {
        console.error(error);

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
        console.log(data);

        if (data.status === 'successful') {
          console.log('Successfull registration');
          return data.token;
        }

        console.error(data.reason);
        setErrorState(data.reason);

        return NO_TOKEN;
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setErrorState(error.message);
        }

        return NO_TOKEN;
      }
    },
    [setErrorState],
  );

  return {
    login,
    register,
  };
}

export default useApiService;
