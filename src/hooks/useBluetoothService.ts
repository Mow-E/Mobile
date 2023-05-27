import {useCallback} from 'react';
import useActiveMowerConnection from './useActiveMowerConnection';
import {
  checkBluetoothState,
  connect as connectMower,
  disconnect as disconnectMower,
  scanForBluetoothDevices,
  DEFAULT_SECONDS_TO_SCAN_FOR_DEVICES,
  sendMessage,
  stopScanningForBluetoothDevices,
} from '../services/bluetooth';
import useMowerMode from './useMowerMode';
import BluetoothState from '../models/BluetoothState';
import {useTranslation} from 'react-i18next';
import MowerConnection from '../models/MowerConnection';

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
 *
 * The service functions throw an error if bluetooth is not enabled or authorized, or if
 * an error occurs in the bluetooth process, thus these errors should be catched.
 */
function useBluetoothService() {
  const {activeConnection, setActiveConnection} = useActiveMowerConnection();
  const {mowerMode} = useMowerMode();
  const {t} = useTranslation();

  /**
   * Checks whether bluetooth is enabled and authorized.
   * Throws an error if not.
   */
  const requireBluetoothActive = useCallback<() => Promise<void>>(async () => {
    const bluetoothState = await checkBluetoothState();

    if (bluetoothState !== BluetoothState.On) {
      console.error('Bluetooth is not on or authorized!');
      throw new Error(t('errors.bluetoothNotOnOrAuthorized')!);
    }
  }, [t]);

  // I don't know how to gracefully check that the scan has stopped, so just wait for the scan duration here
  const waitForScanToComplete = useCallback<
    (secondsToWait: number) => Promise<void>
  >(
    secondsToWait =>
      new Promise(resolve =>
        // Timeouts time value is in milliseconds, so multiply seconds with 1000 for ms
        setTimeout(() => resolve(), secondsToWait * 1000),
      ),
    [],
  );

  /**
   * Starts a scan for available mower devices.
   * All devices found are put into the `availableConnections` context, which is emptied before the scan.
   * The promise resolves once the scan has finished/stopped.
   */
  const scanForDevices = useCallback<(secondsToWait?: number) => Promise<void>>(
    async (secondsToWait = DEFAULT_SECONDS_TO_SCAN_FOR_DEVICES) => {
      await requireBluetoothActive();

      await scanForBluetoothDevices(secondsToWait);
      await waitForScanToComplete(secondsToWait);
    },
    [requireBluetoothActive, waitForScanToComplete],
  );

  /**
   * Disconnects the active mower connection, if any exists, and sets the active connection to null.
   */
  const disconnect = useCallback(async () => {
    await requireBluetoothActive();

    if (activeConnection !== null) {
      await disconnectMower(activeConnection);
      await scanForDevices(1);
      setActiveConnection(null);
      return;
    }

    console.warn('Cannot disconnect active connection since there is none');
  }, [
    activeConnection,
    setActiveConnection,
    requireBluetoothActive,
    scanForDevices,
  ]);

  /**
   * Sends a command to the current active mower, or throws an error if no active connection.
   *
   * @param command MowerCommand the command to send.
   */
  const sendCommand = useCallback<
    (command: MowerCommand, connection?: MowerConnection) => Promise<void>
  >(
    async (command, connection) => {
      await requireBluetoothActive();

      let connectionToUse = connection ?? activeConnection;

      if (connectionToUse === null) {
        throw new Error(
          `Cannot send command ${command} because there is no active connection`,
        );
      }

      await sendMessage(command, connectionToUse);
    },
    [activeConnection, requireBluetoothActive],
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
      await requireBluetoothActive();

      if (activeConnection !== null) {
        await disconnect();
      }

      const connectedMower = await connectMower(mowerConnection);
      try {
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
      } catch (e) {
        // Make sure the device does not stay connected after failing the verification
        await disconnectMower(mowerConnection);
        throw e;
      }

      // Set active connection only after successfully running the verification process
      setActiveConnection(connectedMower);

      return connectedMower;
    },
    [
      activeConnection,
      setActiveConnection,
      disconnect,
      mowerMode,
      sendCommand,
      requireBluetoothActive,
    ],
  );

  /**
   * Stops any running scan for bluetooth devices.
   */
  const stopScanForDevices = useCallback<() => Promise<void>>(async () => {
    await requireBluetoothActive();

    await stopScanningForBluetoothDevices();
  }, [requireBluetoothActive]);

  return {connect, disconnect, sendCommand, scanForDevices, stopScanForDevices};
}

export default useBluetoothService;
