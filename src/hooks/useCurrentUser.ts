import {createContext, useContext} from 'react';

/**
 * The data of the current logged-in user.
 */
export interface CurrentUser {
  /**
   * The token to authorize the user, e.g. in a web api.
   */
  authorizationToken: string;
}

/**
 * Context that stores the current logged-in user.
 */
export const CurrentUserContext = createContext<CurrentUser | null>(null);

/**
 * Returns the current logged-in user.
 */
const useCurrentUser = () => useContext(CurrentUserContext);

export default useCurrentUser;
