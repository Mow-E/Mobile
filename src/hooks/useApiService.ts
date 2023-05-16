import {useCallback} from 'react';
import {fetchWithAuthorization, LOGIN_URL, REGISTER_URL} from '../services/api';

type LoginFetchResult =
  | {
      status: 'successful';
      token: string;
    }
  | {
      status: 'error';
      message: string;
    };

/**
 * Provides functions to use the API.
 */
function useApiService() {
  // The current user can be used here later on to check that a user/token
  // exists before making api calls that need authorization
  // const currentUser = useCurrentUser();

  /**
   * Tries to perform a login with the provided credentials.
   * Resolves to the token on success, or an empty string on failure.
   */
  const login = useCallback<
    (username: string, password: string) => Promise<string>
  >(async (username, password) => {
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

      throw new Error(`login unsuccessful: ${data.message}`);
    } catch (error) {
      console.error(error);
      // TODO: better error handling needed here
      return '';
    }
  }, []);

  const register = useCallback<
    (username: string, password: string) => Promise<string>
  >(async (username, password) => {
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
      const data: LoginFetchResult = await response.json();
      console.log(data);

      if (data.status === 'successful') {
        console.log('Successfull registration');
        return data.token;
      }

      throw new Error(`register unsuccessful: ${data.message}`);
    } catch (error) {
      console.error(error);
      // TODO: better error handling needed here
      return '';
    }
  }, []);

  return {
    login,
    register,
  };
}

export default useApiService;
