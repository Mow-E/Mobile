import {MowerConnection} from '../hooks/useActiveMowerConnection';
import BleManager from 'react-native-ble-manager';

export async function startBluetoothService(): Promise<void> {
  await BleManager.start();
  console.debug('[ble] started ble manager');
}

export async function disconnect(
  mowerConnection: MowerConnection,
): Promise<MowerConnection> {
  await BleManager.disconnect(mowerConnection.id);
  console.debug(`[ble] disconnected from ${mowerConnection.id}`);

  return mowerConnection;
}
