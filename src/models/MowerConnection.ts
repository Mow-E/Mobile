/**
 * An (available) connection to a mower. Doesn't have to be an active connection.
 */
interface MowerConnection {
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
   * The state of the mower, if it is connected.
   * Newly connected mowers always start in the 'off' state.
   */
  state?: 'on' | 'off';
  /**
   * General domain infos about the mower.
   */
  mowerInfos?: {
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
    /**
     * The bluetooth rssi when the device was discovered.
     */
    rssiWhenDiscovered: number;
  };
}

export default MowerConnection;
