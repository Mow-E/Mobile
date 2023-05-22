import {useCallback} from 'react';
import useActiveMowerConnection, {
  MowerConnection,
} from './useActiveMowerConnection';
import {
  connect as connectMower,
  disconnect as disconnectMower,
  scanForBluetoothDevices,
  SECONDS_TO_SCAN_FOR_DEVICES,
  sendMessage,
} from '../services/bluetooth';
import useMowerMode from './useMowerMode';
import useAvailableMowerConnections from './useAvailableMowerConnections';

/**
 * A command that can be sent to the current connected mower.
 */
export enum MowerCommand {
  /**
   * Starts the mower (when in automatic mode).
   */
  Start = 'G',
  /**
   * Stops the mower in manual mode.
   */
  StopInManual = 'S',
  /**
   * Stops the mower in automatic mode.
   */
  StopInAutomatic = 'O',
  /**
   * Lets the mower continuously move forward until stopped (if in manual mode).
   */
  MoveForward = 'F',
  /**
   * Lets the mower continuously move backward until stopped (if in manual mode).
   */
  MoveBackward = 'B',
  /**
   * Lets the mower continuously move right until stopped (if in manual mode).
   */
  MoveRight = 'R',
  /**
   * Lets the mower continuously move left until stopped (if in manual mode).
   */
  MoveLeft = 'L',
  /**
   * Changes the current mode of the mower to automatic.
   */
  ChangeModeToAutomatic = 'A',
  /**
   * Changes the current mode of the mower to manual.
   */
  ChangeModeToManual = 'M',
}

/**
 * Provides service functions for interacting with the active mower connection
 * via bluetooth and finding new connections.
 */
function useBluetoothService() {
  const {activeConnection, setActiveConnection} = useActiveMowerConnection();
  const {setAvailableConnections} = useAvailableMowerConnections();
  const {mowerMode} = useMowerMode();

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

  /**
   * Sends a command to the current active mower, or throws an error if no active connection.
   *
   * @param command MowerCommand the command to send.
   */
  const sendCommand = useCallback<
    (command: MowerCommand, connection?: MowerConnection) => Promise<void>
  >(
    async (command, connection) => {
      if (activeConnection === null && !connection) {
        throw new Error(
          `Cannot send command ${command} because there is no active connection`,
        );
      }

      await sendMessage(command, activeConnection ?? connection!);
    },
    [activeConnection],
  );

  /**
   * Establishes a connection to a given mower as per the defined protocol/handshake.
   * This also sets the mower mode of the connected mower to the currently selected mode.
   * The mower will start in a "stopped" state, regardless of the mode.
   *
   * @param mowerConnection MowerConnection the mower to connect to.
   */
  const connect = useCallback<
    (mowerConnection: MowerConnection) => Promise<MowerConnection>
  >(
    async mowerConnection => {
      if (activeConnection !== null) {
        await disconnect();
      }

      const connectedMower = await connectMower(mowerConnection);
      setActiveConnection(connectedMower);
      // Mower id has to be sent as verification/"password" directly after connecting,
      // otherwise the mower would disconnect again
      await sendMessage(connectedMower.id, connectedMower);
      // Make sure the mower starts in the currently selected mode
      await sendCommand(
        mowerMode === 'manual'
          ? MowerCommand.ChangeModeToManual
          : MowerCommand.ChangeModeToAutomatic,
        connectedMower,
      );

      return connectedMower;
    },
    [activeConnection, setActiveConnection, disconnect, mowerMode, sendCommand],
  );

  /**
   * Starts a scan for available mower devices.
   * All devices found are put into the `availableConnections` context, which is emptied before the scan.
   * The promise resolves once the scan has finished/stopped.
   */
  const scanForDevices = useCallback<() => Promise<void>>(async () => {
    setAvailableConnections(new Map<string, MowerConnection>());
    await scanForBluetoothDevices();
    // I don't know how to gracefully check that the scan has stopped, so just wait for the scan duration here
    await new Promise(resolve =>
      // Timeouts time value is in milliseconds, so multiply seconds with 1000 for ms
      setTimeout(() => resolve(null), SECONDS_TO_SCAN_FOR_DEVICES * 1000),
    );
  }, [setAvailableConnections]);

  return {connect, disconnect, sendCommand, scanForDevices};
}

export default useBluetoothService;
