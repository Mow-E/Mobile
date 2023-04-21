import {createContext, useContext} from 'react';
import {MowerConnection} from './useActiveMowerConnection';

/**
 * The properties saved in the `AvailableMowerConnectionsContext`.
 */
interface AvailableMowerConnectionsContextType {
  /**
   * The available connections to mowers.
   */
  availableConnections: MowerConnection[];
  /**
   * Setter for the available connections.
   *
   * @param connection the new connections.
   */
  setAvailableConnections?: (connections: MowerConnection[]) => void;
}

/**
 * Context that stores the available connections to mowers and a setter to change them.
 */
export const AvailableMowerConnectionsContext =
  createContext<AvailableMowerConnectionsContextType>({
    availableConnections: [],
  });

/**
 * Returns the (currently) active connection to a mower and a setter to change it.
 */
const useAvailableMowerConnections = () =>
  useContext(AvailableMowerConnectionsContext);

export default useAvailableMowerConnections;
