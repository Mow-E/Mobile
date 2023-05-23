import {createContext, useContext} from 'react';

import MowerConnection from '../models/MowerConnection';

/**
 * The properties saved in the `AvailableMowerConnectionsContext`.
 */
interface AvailableMowerConnectionsContextType {
  /**
   * The available connections to mowers.
   */
  availableConnections: Map<string, MowerConnection>;
  /**
   * Setter for the available connections.
   *
   * @param connection the new connections.
   */
  setAvailableConnections: (connections: Map<string, MowerConnection>) => void;
}

/**
 * Context that stores the available connections to mowers and a setter to change them.
 */
export const AvailableMowerConnectionsContext =
  createContext<AvailableMowerConnectionsContextType>({
    availableConnections: new Map<string, MowerConnection>(),
    setAvailableConnections: () => {},
  });

/**
 * Returns the (currently) active connection to a mower and a setter to change it.
 */
const useAvailableMowerConnections = () =>
  useContext(AvailableMowerConnectionsContext);

export default useAvailableMowerConnections;
