import {MowerConnection} from '../hooks/useActiveMowerConnection';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';

/** The default ending sequence for messages to mowers. */
export const DEFAULT_ENDING_SEQUENCE = '*';

export async function startBluetoothService(): Promise<void> {
  await BleManager.start();
  console.debug('[ble] started ble manager');
}

/**
 * Connects to a given mower.
 *
 * @param mowerConnection MowerConnection the mower to connect to.
 */
export async function connect(
  mowerConnection: MowerConnection,
): Promise<MowerConnection> {
  requireBluetoothInfosInConnection(
    mowerConnection,
    `Cannot connect to mower ${mowerConnection.id} because there are no bluetooth infos about it`,
  );

  await BleManager.connect(mowerConnection.bluetoothInfos!.id);
  console.debug(
    `[ble] connected to ${mowerConnection.id} with bluetooth id ${
      mowerConnection.bluetoothInfos!.id
    }`,
  );

  return mowerConnection;
}

export async function disconnect(
  mowerConnection: MowerConnection,
): Promise<MowerConnection> {
  requireBluetoothInfosInConnection(
    mowerConnection,
    `Cannot disconnect from mower ${mowerConnection.id} because there are no bluetooth infos about it`,
  );

  await BleManager.disconnect(mowerConnection.bluetoothInfos!.id);
  console.debug(
    `[ble] disconnected from ${mowerConnection.id} with bluetooth id ${
      mowerConnection.bluetoothInfos!.id
    }`,
  );

  return mowerConnection;
}

/**
 * Options to adjust the message sent to a mower.
 */
interface MessageOptions {
  /**
   * Character that signals the end of a message.
   * Defaults to `DEFAULT_ENDING_SEQUENCE`.
   */
  endingSequence?: string;
  /**
   * The bluetooth service id to send the message to.
   * Defaults to the first service id found for the bluetooth connection.
   */
  serviceId?: string;
  /**
   * The bluetooth characteristic id to send the message to.
   * Defaults to the first characteristic id found for the bluetooth connection.
   */
  characteristicId?: string;
}

/**
 * Sends a message to the given mower connection.
 *
 * @param message string the message to send.
 * @param mowerConnection MowerConnection the connection to send the message to. Needs to have its bluetooth infos specified.
 * @param options MessageOptions optional options to adjust the message sending.
 */
export async function sendMessage(
  message: string,
  mowerConnection: MowerConnection,
  options: MessageOptions = {},
): Promise<MowerConnection> {
  const {
    endingSequence = DEFAULT_ENDING_SEQUENCE,
    serviceId,
    characteristicId,
  } = options;
  requireBluetoothInfosInConnection(
    mowerConnection,
    `Cannot send message to mower ${mowerConnection.id} because there are no bluetooth infos about it`,
  );

  const deviceConnectionInfos = await getDeviceConnectionInfos(mowerConnection);

  const serviceIdToUse = serviceId ?? deviceConnectionInfos.serviceIds[0];
  if (!deviceConnectionInfos.serviceIds.includes(serviceIdToUse)) {
    console.error(`[ble] service ${serviceIdToUse} not found`);
    throw new Error(`Service ${serviceIdToUse} not found`);
  }

  const characteristicIdToUse =
    characteristicId ?? deviceConnectionInfos.characteristicIds[0];
  if (
    !deviceConnectionInfos.characteristicIds.includes(characteristicIdToUse)
  ) {
    console.error(`[ble] characteristic ${characteristicIdToUse} not found`);
    throw new Error(`Characteristic ${characteristicIdToUse} not found`);
  }

  const data = Buffer.from(message + endingSequence);

  await BleManager.write(
    mowerConnection.bluetoothInfos!.id,
    serviceIdToUse,
    characteristicIdToUse,
    data.toJSON().data,
  );
  console.debug(
    `[ble] sent message to mower ${mowerConnection.id} with bluetooth id ${
      mowerConnection.bluetoothInfos!.id
    }`,
    data.toString(),
  );

  return mowerConnection;
}

export async function getDeviceConnectionInfos(
  mowerConnection: MowerConnection,
): Promise<{serviceIds: string[]; characteristicIds: string[]}> {
  requireBluetoothInfosInConnection(
    mowerConnection,
    `Cannot get device infos of mower ${mowerConnection.id} because there are no bluetooth infos about it`,
  );

  const peripheralInfo = await BleManager.retrieveServices(
    mowerConnection.bluetoothInfos!.id,
  );
  console.debug(
    `[ble] read info from mower ${mowerConnection.id} with bluetooth id ${
      mowerConnection.bluetoothInfos!.id
    }`,
    peripheralInfo,
  );

  const serviceIds =
    peripheralInfo.services?.map(service => service.uuid) ?? [];
  const characteristicIds =
    peripheralInfo.characteristics?.map(
      characteristic => characteristic.characteristic,
    ) ?? [];

  return {serviceIds, characteristicIds};
}

/**
 * Checks that a given mower connection as bluetooth infos specified.
 * Throws an error if not.
 *
 * @param connection MowerConnection the connection to check.
 * @param errorMessage string|undefined optional message for the error thrown.
 */
function requireBluetoothInfosInConnection(
  connection: MowerConnection,
  errorMessage?: string,
): void {
  if (connection.bluetoothInfos === undefined) {
    throw new Error(
      errorMessage ?? `Mower ${connection.id} has no bluetooth infos about it`,
    );
  }
}
