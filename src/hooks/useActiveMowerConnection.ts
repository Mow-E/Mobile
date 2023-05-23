import {createContext, useContext} from 'react';
import MowerConnection from '../models/MowerConnection';

/**
 * The properties saved in the `ActiveMowerConnectionContext`.
 */
interface ActiveMowerConnectionContextType {
  /**
   * The (currently) active connection to a mower, or null if no active connection.
   */
  activeConnection: MowerConnection | null;
  /**
   * Setter for the active connection.
   *
   * @param connection the new connection to set active.
   */
  setActiveConnection: (connection: MowerConnection | null) => void;
}

/**
 * Context that stores the (currently) active connection to a mower and a setter to change it.
 */
export const ActiveMowerConnectionContext =
  createContext<ActiveMowerConnectionContextType>({
    activeConnection: null,
    setActiveConnection: () => {},
  });

/**
 * Returns the (currently) active connection to a mower and a setter to change it.
 */
const useActiveMowerConnection = () => useContext(ActiveMowerConnectionContext);

export default useActiveMowerConnection;
