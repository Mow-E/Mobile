import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import useStyles from '../hooks/useStyles';
import useBluetoothService, {MowerCommand} from '../hooks/useBluetoothService';
import useActiveMowerConnection from '../hooks/useActiveMowerConnection';
import useMowerMode from '../hooks/useMowerMode';
import MowerOnOffButton from '../components/map/MowerOnOffButton';
import ManualMowerControls, {
  ControlDirection,
} from '../components/map/ManualMowerControls';
import MowESleepingIcon from '../assets/icons/MowESleepingIcon';
import useIsInDarkMode from '../hooks/useIsInDarkMode';
import spacing from '../styles/spacing';

/**
 * The page that visualizes the mowers position and path.
 * Also contains the movement controls for the mower.
 */
function MapPage(): JSX.Element {
  const {activeConnection} = useActiveMowerConnection();
  const {mowerMode} = useMowerMode();
  const {t} = useTranslation();
  const styles = useStyles();
  const bluetoothService = useBluetoothService();
  const isInDarkMode = useIsInDarkMode();

  const handleMowerStartPress = useCallback(async () => {
    if (activeConnection === null) {
      return;
    }

    await bluetoothService.sendCommand(MowerCommand.Start);
    console.debug('[automatic control] started moving');
  }, [activeConnection, bluetoothService]);

  const handleMowerStopPress = useCallback(async () => {
    if (activeConnection === null) {
      return;
    }

    await bluetoothService.sendCommand(MowerCommand.Stop);
    console.debug('[automatic control] stopped moving');
  }, [activeConnection, bluetoothService]);

  const handleManualControlPress = useCallback<
    (direction: ControlDirection) => Promise<void>
  >(
    async direction => {
      if (activeConnection === null) {
        return;
      }

      switch (direction) {
        case 'forward':
          await bluetoothService.sendCommand(MowerCommand.MoveForward);
          break;
        case 'backward':
          await bluetoothService.sendCommand(MowerCommand.MoveBackward);
          break;
        case 'left':
          await bluetoothService.sendCommand(MowerCommand.MoveLeft);
          break;
        case 'right':
          await bluetoothService.sendCommand(MowerCommand.MoveRight);
          break;
      }

      console.debug(`[manual control] started moving ${direction}`);
    },
    [activeConnection, bluetoothService],
  );

  const handleManualControlRelease = useCallback<
    (direction: ControlDirection) => Promise<void>
  >(
    async direction => {
      if (activeConnection === null) {
        return;
      }

      await bluetoothService.sendCommand(MowerCommand.Stop);
      console.debug(`[manual control] stopped moving ${direction}`);
    },
    [activeConnection, bluetoothService],
  );

  return (
    <View style={styles.centeredContent}>
      {activeConnection === null && (
        <>
          <Text style={[styles.textNormal, componentStyles.emptyStateText]}>
            {t('routes.map.noMowerConnectedText')}
          </Text>
          <View style={componentStyles.emptyStateIcon}>
            <MowESleepingIcon size={225} darkModeInverted={isInDarkMode} />
          </View>
        </>
      )}
      {activeConnection !== null && mowerMode === 'manual' && (
        <ManualMowerControls
          onControlPressStart={handleManualControlPress}
          onControlPressStop={handleManualControlRelease}
        />
      )}
      {activeConnection !== null && mowerMode === 'automatic' && (
        <MowerOnOffButton
          onStartPress={handleMowerStartPress}
          onStopPress={handleMowerStopPress}
        />
      )}
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  emptyStateText: {paddingBottom: spacing.xxl},
  emptyStateIcon: {position: 'absolute', bottom: spacing.xxl},
});

export default MapPage;
