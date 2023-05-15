import {
  EmitterSubscription,
  EventSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {MowerConnection} from '../hooks/useActiveMowerConnection';
import BleManager, {
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
import {Buffer} from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

/** The default ending sequence for messages to mowers. */
export const DEFAULT_ENDING_SEQUENCE = '*';

export const SECONDS_TO_SCAN_FOR_DEVICES = 7;

export async function startBluetoothService(): Promise<void> {
  await BleManager.start();
  console.debug('[ble] started ble manager');
}

async function convertDiscoveredPeripheralToMowerConnection(
  peripheral: Peripheral,
): Promise<MowerConnection> {
  return {
    // TODO: where do we get the mower-id from?
    id: peripheral.id,
    name: peripheral.name ?? peripheral.id,
    bluetoothInfos: {
      id: peripheral.id,
      serviceIds: peripheral.advertising.serviceUUIDs ?? [],
      characteristicIds: [],
    },
  };
}

export function addBluetoothServiceListeners(
  onDeviceDiscovered: (connection: MowerConnection) => void,
  onScanStop: () => void,
): EmitterSubscription[] {
  console.debug('[ble] adding listeners to bluetooth service');

  return [
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      async (peripheral: Peripheral) => {
        // TODO: we might want to filter for mowers somehow
        console.debug('[ble] new device discovered', peripheral);
        const mowerConnection =
          await convertDiscoveredPeripheralToMowerConnection(peripheral);
        onDeviceDiscovered(mowerConnection);
      },
    ),
    bleManagerEmitter.addListener('BleManagerStopScan', event => {
      console.log('[ble] stopped scanning for bluetooth devices', event);
      onScanStop();
    }),
  ];
}

export function removeBluetoothServiceListeners(
  listeners: EventSubscription[],
): void {
  console.log('removing listeners');
  for (const listener of listeners) {
    listener.remove();
  }
}

export async function scanForBluetoothDevices(): Promise<void> {
  console.log('[ble] started scanning for bluetooth devices');
  await BleManager.scan([], SECONDS_TO_SCAN_FOR_DEVICES, false, {
    matchMode: BleScanMatchMode.Sticky,
    scanMode: BleScanMode.LowLatency,
    callbackType: BleScanCallbackType.AllMatches,
  });
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

  const infos = await getDeviceConnectionInfos(mowerConnection);

  return {
    ...mowerConnection,
    state: 'off',
    bluetoothInfos: {
      ...mowerConnection.bluetoothInfos!,
      serviceIds: infos.serviceIds,
      characteristicIds: infos.characteristicIds,
    },
  };
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

  return {
    ...mowerConnection,
    state: undefined,
  };
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
