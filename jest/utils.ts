import * as useIsInDarkMode from '../src/hooks/useIsInDarkMode';
import * as useBluetoothService from '../src/hooks/useBluetoothService';
import * as useApiService from '../src/hooks/useApiService';
import MowerConnection from '../src/models/MowerConnection';
import MowerHistoryEvent from '../src/models/MowerHistoryEvent';
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
