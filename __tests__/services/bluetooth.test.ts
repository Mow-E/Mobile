import {
  checkBluetoothState,
  connect,
  disconnect,
  getDeviceConnectionInfos,
  scanForBluetoothDevices,
  sendMessage,
  startBluetoothService,
  stopScanningForBluetoothDevices,
} from '../../src/services/bluetooth';
import {BleState} from 'react-native-ble-manager';
import {mockBleManager} from '../../jest/utils';
import MowerConnection from '../../src/models/MowerConnection';
import {TextEncoder} from 'text-encoding';

const SIMPLE_MOWER_CONNECTION: MowerConnection = {
  id: 'foo',
  name: 'The Foo Mowers',
  bluetoothInfos: {
    id: 'foo-ble',
    serviceIds: [],
    characteristicIds: [],
    rssiWhenDiscovered: 0,
  },
};

describe('bluetooth', () => {
  it('starts BleManager', async () => {
    let started = false;
    mockBleManager({
      start: async () => {
        started = true;
      },
    });
    await startBluetoothService();
    expect(started).toBeTruthy();
  });

  it('checks bluetooth state', async () => {
    mockBleManager({checkState: async () => BleState.On});
    const resultingStateOn = await checkBluetoothState();
    expect(resultingStateOn).toBe(BleState.On);

    mockBleManager({checkState: async () => BleState.Off});
    const resultingStateOff = await checkBluetoothState();
    expect(resultingStateOff).toBe(BleState.Off);

    mockBleManager({checkState: async () => BleState.Unauthorized});
    const resultingStateUnauthorized = await checkBluetoothState();
    expect(resultingStateUnauthorized).toBe(BleState.Unauthorized);
  });

  it('starts scan for ble devices', async () => {
    let numSecondsScanIsStartedFor = -1;
    mockBleManager({
      scan: async (_, seconds) => {
        numSecondsScanIsStartedFor = seconds;
      },
    });

    await scanForBluetoothDevices(7);
    expect(numSecondsScanIsStartedFor).toBe(7);

    await scanForBluetoothDevices(42);
    expect(numSecondsScanIsStartedFor).toBe(42);
  });

  it('stops ble scan', async () => {
    let stopped = false;
    mockBleManager({
      stopScan: async () => {
        stopped = true;
      },
    });
    await stopScanningForBluetoothDevices();
    expect(stopped).toBeTruthy();
  });

  it('gets device connection infos via bluetooth', async () => {
    const serviceUuid = 'ec00';
    const characteristicUuid = 'ec0F';
    // MOWER_ID+SERIAL_NUMBER+MODEL_NAME+MODEL_NUMBER
    const mowerId = 'foo-mower-id';
    const serialNumber = 42;
    const modelName = 'foo-model-name';
    const modelNumber = 'foo-model-number';

    mockBleManager({
      retrieveServices: async peripheralId => ({
        id: peripheralId,
        name: SIMPLE_MOWER_CONNECTION.name,
        rssi: SIMPLE_MOWER_CONNECTION.bluetoothInfos!.rssiWhenDiscovered,
        serviceUUIDs: [serviceUuid],
        services: [{uuid: serviceUuid}],
        characteristics: [
          {
            characteristic: characteristicUuid,
            properties: {},
            service: serviceUuid,
          },
        ],
        advertising: {},
      }),
      read: async () =>
        new TextEncoder().encode(
          `${mowerId}+${serialNumber}+${modelName}+${modelNumber}`,
        ),
    });

    const deviceConnectionInfos = await getDeviceConnectionInfos(
      SIMPLE_MOWER_CONNECTION,
    );

    expect(deviceConnectionInfos.mowerId).toBe(mowerId);
    expect(deviceConnectionInfos.serialNumber).toBe(serialNumber);
    expect(deviceConnectionInfos.modelName).toBe(modelName);
    expect(deviceConnectionInfos.modelNumber).toBe(modelNumber);
    expect(deviceConnectionInfos.serviceIds).toStrictEqual([serviceUuid]);
    expect(deviceConnectionInfos.characteristicIds).toStrictEqual([
      characteristicUuid,
    ]);
  });

  it('connects to mower via bluetooth', async () => {
    const serviceUuid = 'ec00';
    const characteristicUuid = 'ec0F';
    // MOWER_ID+SERIAL_NUMBER+MODEL_NAME+MODEL_NUMBER
    const mowerId = 'foo-mower-id';
    const serialNumber = 42;
    const modelName = 'foo-model-name';
    const modelNumber = 'foo-model-number';

    let connected = false;

    mockBleManager({
      connect: async () => {
        connected = true;
      },
      retrieveServices: async peripheralId => ({
        id: peripheralId,
        name: SIMPLE_MOWER_CONNECTION.name,
        rssi: SIMPLE_MOWER_CONNECTION.bluetoothInfos!.rssiWhenDiscovered,
        serviceUUIDs: [serviceUuid],
        services: [{uuid: serviceUuid}],
        characteristics: [
          {
            characteristic: characteristicUuid,
            properties: {},
            service: serviceUuid,
          },
        ],
        advertising: {},
      }),
      read: async () =>
        new TextEncoder().encode(
          `${mowerId}+${serialNumber}+${modelName}+${modelNumber}`,
        ),
    });

    const connectedMower = await connect(SIMPLE_MOWER_CONNECTION);

    expect(connected).toBeTruthy();
    expect(connectedMower.id).toBe(mowerId);
    expect(connectedMower.state).toBe('off');
    expect(connectedMower.mowerInfos!.serialNumber).toBe(serialNumber);
    expect(connectedMower.mowerInfos!.modelName).toBe(modelName);
    expect(connectedMower.mowerInfos!.modelNumber).toBe(modelNumber);
    expect(connectedMower.bluetoothInfos!.serviceIds).toStrictEqual([
      serviceUuid,
    ]);
    expect(connectedMower.bluetoothInfos!.characteristicIds).toStrictEqual([
      characteristicUuid,
    ]);
  });

  it('disconnects mower', async () => {
    let disconnected = false;
    mockBleManager({
      disconnect: async () => {
        disconnected = true;
      },
    });
    await disconnect(SIMPLE_MOWER_CONNECTION);
    expect(disconnected).toBeTruthy();
  });

  it('throws error if mower connection has no bluetooth infos attached', async () => {
    let disconnected = false;
    mockBleManager({
      disconnect: async () => {
        disconnected = true;
      },
    });
    try {
      await disconnect({id: 'foo', name: 'foo'});
      fail('Missing bluetooth infos were not detected');
    } catch (e) {
      // Error is expected
    }
    expect(disconnected).toBeFalsy();
  });

  it('sends message to mower with ending sequence automatically added', async () => {
    const serviceUuid = 'ec00';
    const characteristicUuid = 'ec0F';
    // MOWER_ID+SERIAL_NUMBER+MODEL_NAME+MODEL_NUMBER
    const mowerId = 'foo-mower-id';
    const serialNumber = 42;
    const modelName = 'foo-model-name';
    const modelNumber = 'foo-model-number';

    let messageThatWasSent: number[] = [];

    mockBleManager({
      retrieveServices: async peripheralId => ({
        id: peripheralId,
        name: SIMPLE_MOWER_CONNECTION.name,
        rssi: SIMPLE_MOWER_CONNECTION.bluetoothInfos!.rssiWhenDiscovered,
        serviceUUIDs: [serviceUuid],
        services: [{uuid: serviceUuid}],
        characteristics: [
          {
            characteristic: characteristicUuid,
            properties: {},
            service: serviceUuid,
          },
        ],
        advertising: {},
      }),
      read: async () =>
        new TextEncoder().encode(
          `${mowerId}+${serialNumber}+${modelName}+${modelNumber}`,
        ),
      write: async (_, __, ___, data) => {
        messageThatWasSent = data;
      },
    });

    await sendMessage('foo', SIMPLE_MOWER_CONNECTION);

    expect(messageThatWasSent.toString()).toStrictEqual(
      new TextEncoder().encode('foo*').toString(),
    );
  });
});
