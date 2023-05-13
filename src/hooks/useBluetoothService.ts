import {useCallback} from 'react';
import useActiveMowerConnection from './useActiveMowerConnection';
import {disconnect as disconnectMower} from '../services/bluetooth';

/**
 * Provides service functions for interacting with the active mower connection
 * via bluetooth and finding new connections.
 */
function useBluetoothService() {
  const {activeConnection, setActiveConnection} = useActiveMowerConnection();

  /**
   * Disconnects the active mower connection, if any exists, and sets the active connection to null.
   */
  const disconnect = useCallback(async () => {
    if (activeConnection !== null) {
      await disconnectMower(activeConnection);
      setActiveConnection(null);
    }

    console.warn('Cannot disconnect active connection since there is none');
  }, [activeConnection, setActiveConnection]);

  return {disconnect};
}

export default useBluetoothService;
