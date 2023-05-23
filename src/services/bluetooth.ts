import {
  EmitterSubscription,
  EventSubscription,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleDiscoverPeripheralEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  BleStopScanEvent,
  Peripheral,
} from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import BluetoothState from '../models/BluetoothState';
import MowerConnection from '../models/MowerConnection';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

/** The default ending sequence for messages to mowers. */
export const DEFAULT_ENDING_SEQUENCE = '*';

export const SECONDS_TO_SCAN_FOR_DEVICES = 4;

/**
 * The fixed service uuids that our mowers use.
 * Set here as a constant to enable filtering discovered devices for (supposedly) compatible devices.
 */
const COMPATIBLE_MOWER_SERVICE_IDS = ['ec00'];

export async function startBluetoothService(): Promise<void> {
  await BleManager.start();
  console.debug('[ble] started ble manager');
}

/**
 * Checks the device for its current bluetooth state, e.g. on, off or unauthorized.
 *
 * @return Promise<BluetoothState> the current bluetooth state
 */
export async function checkBluetoothState(): Promise<BluetoothState> {
  const bleState = await BleManager.checkState();
  console.debug('[ble] current state', bleState);
  return bleState;
}

async function convertDiscoveredPeripheralToMowerConnection(
  peripheral: Peripheral,
): Promise<MowerConnection> {
  return {
    id: peripheral.id,
    name: peripheral.advertising.localName ?? peripheral.name ?? peripheral.id,
    bluetoothInfos: {
      id: peripheral.id,
      serviceIds: peripheral.advertising.serviceUUIDs ?? [],
      characteristicIds: [],
      rssiWhenDiscovered: peripheral.rssi,
    },
  };
}

export function addBluetoothServiceListeners(
  onDeviceDiscovered: (connection: MowerConnection) => void,
  onDeviceDisconnected: (id: string) => void,
  onScanStop: () => void,
): EmitterSubscription[] {
  console.debug('[ble] adding listeners to bluetooth service');

  return [
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      async (peripheral: BleDiscoverPeripheralEvent) => {
        if (peripheral.name !== undefined) {
          console.debug('[ble] new device discovered', peripheral);
          const mowerConnection =
            await convertDiscoveredPeripheralToMowerConnection(peripheral);
          onDeviceDiscovered(mowerConnection);
        }
      },
    ),
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      (event: BleDisconnectPeripheralEvent) => {
        console.debug('[ble] disconnected from device', event);
        onDeviceDisconnected(event.peripheral);
      },
    ),
    bleManagerEmitter.addListener(
      'BleManagerStopScan',
      (event: BleStopScanEvent) => {
        console.debug('[ble] stopped scanning for bluetooth devices', event);
        onScanStop();
      },
    ),
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
  await BleManager.scan(
    COMPATIBLE_MOWER_SERVICE_IDS,
    SECONDS_TO_SCAN_FOR_DEVICES,
    false,
    {
      matchMode: BleScanMatchMode.Sticky,
      scanMode: BleScanMode.LowLatency,
      callbackType: BleScanCallbackType.AllMatches,
    },
  );
  console.log('[ble] started scanning for bluetooth devices');
}

export async function stopScanningForBluetoothDevices(): Promise<void> {
  await BleManager.stopScan();
  console.log('[ble] manually stopped scanning for bluetooth devices');
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

  const {
    mowerId: id,
    serviceIds,
    characteristicIds,
    serialNumber,
    modelName,
    modelNumber,
  } = await getDeviceConnectionInfos(mowerConnection);

  return {
    ...mowerConnection,
    id,
    state: 'off',
    mowerInfos: {
      serialNumber,
      modelName,
      modelNumber,
    },
    bluetoothInfos: {
      ...mowerConnection.bluetoothInfos!,
      serviceIds,
      characteristicIds,
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

interface DeviceConnectionInfos {
  mowerId: string;
  serviceIds: string[];
  characteristicIds: string[];
  serialNumber: number;
  modelName: string;
  modelNumber: string;
}

export async function getDeviceConnectionInfos(
  mowerConnection: MowerConnection,
): Promise<DeviceConnectionInfos> {
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

  const customReadResultData = await BleManager.read(
    mowerConnection.bluetoothInfos!.id,
    serviceIds[0],
    characteristicIds[0],
  );
  // Format (using '+' as separator): MOWER_ID+SERIAL_NUMBER+MODEL_NAME+MODEL_NUMBER
  const customReadResult = Buffer.from(customReadResultData).toString();

  const [mowerId, serialNumber, modelName, modelNumber] =
    customReadResult.split('+');

  return {
    mowerId,
    serviceIds,
    characteristicIds,
    serialNumber: Number.parseInt(serialNumber, 10),
    modelName,
    modelNumber,
  };
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

/**
 * Request permissions to use bluetooth from the user if on an android device.
 * If not on android the function is just skipped.
 */
export async function handleAndroidPermissions(): Promise<void> {
  if (Platform.OS !== 'android') {
    console.debug(
      '[ble] skipping request for bluetooth permissions since not android device',
    );
    return;
  }

  console.debug('[ble] requesting bluetooth permissions on android');

  if (Platform.Version >= 31) {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);

    if (result) {
      console.debug('[ble] User accepts runtime permissions android 12+');
    } else {
      console.error('[ble] User refuses runtime permissions android 12+');
    }
  } else if (Platform.Version >= 23) {
    const checkResult = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (checkResult) {
      console.debug('[ble] runtime permission Android <12 already OK');
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(requestResult => {
        if (requestResult) {
          console.debug('[ble] User accepts runtime permission android <12');
        } else {
          console.error('[ble] User refuses runtime permission android <12');
        }
      });
    }
  }
}
