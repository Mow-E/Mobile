import * as useIsInDarkMode from '../src/hooks/useIsInDarkMode';
import * as useBluetoothService from '../src/hooks/useBluetoothService';
import * as useApiService from '../src/hooks/useApiService';
import MowerConnection from '../src/models/MowerConnection';
import MowerHistoryEvent from '../src/models/MowerHistoryEvent';
import BleManager, {BleState, PeripheralInfo} from 'react-native-ble-manager';
export function setToDarkMode(): void {
  jest.spyOn(useIsInDarkMode, 'default').mockImplementation(() => true);
}

export function mockBluetoothService({
  connect = async connection => connection,
  disconnect = async () => {},
  scanForDevices = async () => {},
  sendCommand = async () => {},
  stopScanForDevices = async () => {},
}: {
  connect?: (connection: MowerConnection) => Promise<MowerConnection>;
  disconnect?: () => Promise<void>;
  scanForDevices?: () => Promise<void>;
  sendCommand?: () => Promise<void>;
  stopScanForDevices?: () => Promise<void>;
}): void {
  jest.spyOn(useBluetoothService, 'default').mockImplementation(() => ({
    connect,
    disconnect,
    scanForDevices,
    sendCommand,
    stopScanForDevices,
  }));
}

export function mockApiService({
  getMowerHistory = async () => [],
  login = async () => '',
  register = async () => '',
}: {
  getMowerHistory?: () => Promise<MowerHistoryEvent[]>;
  login?: () => Promise<string>;
  register?: () => Promise<string>;
}): void {
  jest.spyOn(useApiService, 'default').mockImplementation(() => ({
    getMowerHistory,
    login,
    register,
  }));
}

export function mockBleManager({
  checkState = async () => BleState.On,
  connect = async () => {},
  disconnect = async () => {},
  read = async () => [],
  retrieveServices = async peripheralId => ({
    id: peripheralId,
    rssi: 0,
    advertising: {},
  }),
  scan = async () => {},
  start = async () => {},
  stopScan = async () => {},
  write = async () => {},
}: {
  checkState?: () => Promise<BleState>;
  connect?: (peripheralId: string) => Promise<void>;
  disconnect?: (peripheralId: string) => Promise<void>;
  read?: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => Promise<number[]>;
  retrieveServices?: (peripheralId: string) => Promise<PeripheralInfo>;
  scan?: (serviceUUIDs: string[], seconds: number) => Promise<void>;
  start?: () => Promise<void>;
  stopScan?: () => Promise<void>;
  write?: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
    data: number[],
    maxByteSize?: number | undefined,
  ) => Promise<void>;
}) {
  jest.spyOn(BleManager, 'checkState').mockImplementation(checkState);
  jest.spyOn(BleManager, 'connect').mockImplementation(connect);
  jest.spyOn(BleManager, 'disconnect').mockImplementation(disconnect);
  jest.spyOn(BleManager, 'read').mockImplementation(read);
  jest
    .spyOn(BleManager, 'retrieveServices')
    .mockImplementation(retrieveServices);
  jest.spyOn(BleManager, 'scan').mockImplementation(scan);
  jest.spyOn(BleManager, 'start').mockImplementation(start);
  jest.spyOn(BleManager, 'stopScan').mockImplementation(stopScan);
  jest.spyOn(BleManager, 'write').mockImplementation(write);
}

export function mockFetch(factory: () => Promise<Partial<Response>>): void {
  global.fetch = jest.fn(factory);
}
