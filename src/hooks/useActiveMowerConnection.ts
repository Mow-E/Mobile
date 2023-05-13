import {createContext, useContext} from 'react';

/**
 * An (available) connection to a mower. Doesn't have to be an active connection.
 */
export interface MowerConnection {
  /**
   * A unique id representing the mower.
   */
  id: string;
  /**
   * The name of the mower.
   */
  name: string;
  /**
   * The password of the mower.
   */
  password?: string;
  /**
   * General domain infos about the mower.
   */
  mowerInfos: {
    /**
     * Serial number of Mower.
     */
    serialNumber: number;
    /**
     * Model name of Mower
     */
    modelName: string;
    /**
     * Model number of Mower
     */
    modelNumber: string;
  };
  /**
   * Bluetooth infos about the mower device.
   */
  bluetoothInfos?: {
    /**
     * The id of the bluetooth connection (not the mower-id).
     */
    id: string;
    /**
     * The available services advertised by the bluetooth device.
     */
    serviceIds: string[];
    /**
     * The available characteristics advertised by the bluetooth device.
     */
    characteristicIds: string[];
  };
}

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
