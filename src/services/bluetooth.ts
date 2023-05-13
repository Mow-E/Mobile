import {MowerConnection} from '../hooks/useActiveMowerConnection';
import BleManager from 'react-native-ble-manager';

export async function startBluetoothService(): Promise<void> {
  await BleManager.start();
  console.debug('[ble] started ble manager');
}

export async function disconnect(
  mowerConnection: MowerConnection,
): Promise<MowerConnection> {
  if (mowerConnection.bluetoothInfos === undefined) {
    throw new Error(
      `Cannot disconnect from mower ${mowerConnection.id} because there are no bluetooth infos about it`,
    );
  }

  await BleManager.disconnect(mowerConnection.bluetoothInfos.id);
  console.debug(
    `[ble] disconnected from ${mowerConnection.id} with bluetooth id ${mowerConnection.bluetoothInfos.id}`,
  );

  return mowerConnection;
}
