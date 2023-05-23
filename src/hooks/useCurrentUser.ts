import {createContext, useContext} from 'react';
import CurrentUser from '../models/CurrentUser';

/**
 * The properties saved in the `CurrentUserContext`.
 */
interface CurrentUserContextType {
  /**
   * The current logged-in user, or null if no user.
   */
  currentUser: CurrentUser | null;
  /**
   * Setter for the current logged-in user.
   *
   * @param connection the new connection to set active.
   */
  setCurrentUser: (user: CurrentUser | null) => void;
}

/**
 * Context that stores the current logged-in user.
 */
export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

/**
 * Returns the current logged-in user.
 */
const useCurrentUser = () => useContext(CurrentUserContext);

export default useCurrentUser;
