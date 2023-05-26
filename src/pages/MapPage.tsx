import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
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
import useErrorState from '../hooks/useErrorState';
import useMowerHistoryEvents from '../hooks/useMowerHistoryEvents';
import MowerHistoryEvent from '../models/MowerHistoryEvent';
import {getLatestSessionId} from '../services/mower-history-event';
import MowerMap from '../components/map/MowerMap';

/**
 * The page that visualizes the mowers position and path.
 * Also contains the movement controls for the mower.
 */
function MapPage(): JSX.Element {
  const {activeConnection} = useActiveMowerConnection();
  const {mowerMode} = useMowerMode();
  const {setErrorState} = useErrorState();
  const {events} = useMowerHistoryEvents();
  const {t} = useTranslation();
  const styles = useStyles();
  const bluetoothService = useBluetoothService();
  const isInDarkMode = useIsInDarkMode();

  const latestMowingSessionId = useMemo<number>(
    () => getLatestSessionId(events),
    [events],
  );

  const eventsToShowOnMap = useMemo<MowerHistoryEvent[]>(() => {
    return events
      .filter(
        event =>
          event.sessionId === latestMowingSessionId &&
          event.mowerId === activeConnection?.id,
      )
      .sort((a, b) => b.time - a.time);
  }, [events, activeConnection, latestMowingSessionId]);

  const handleMowerStartPress = useCallback(async () => {
    if (activeConnection === null) {
      return;
    }

    try {
      await bluetoothService.sendCommand(MowerCommand.Start);
    } catch (e) {
      console.error(e);

      if (e instanceof Error) {
        setErrorState(e.message);
      } else if (typeof e === 'string') {
        setErrorState(e);
      }
    }
    console.debug('[automatic control] started moving in automatic mode');
  }, [activeConnection, bluetoothService, setErrorState]);

  const handleMowerStopInAutomaticPress = useCallback(async () => {
    if (activeConnection === null) {
      return;
    }

    try {
      await bluetoothService.sendCommand(MowerCommand.StopInAutomatic);
    } catch (e) {
      console.error(e);

      if (e instanceof Error) {
        setErrorState(e.message);
      } else if (typeof e === 'string') {
        setErrorState(e);
      }
    }
    console.debug('[automatic control] stopped moving in automatic mode');
  }, [activeConnection, bluetoothService, setErrorState]);

  const handleManualControlPress = useCallback<
    (direction: ControlDirection) => Promise<void>
  >(
    async direction => {
      if (activeConnection === null) {
        return;
      }

      try {
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
      } catch (e) {
        console.error(e);

        if (e instanceof Error) {
          setErrorState(e.message);
        } else if (typeof e === 'string') {
          setErrorState(e);
        }
      }

      console.debug(`[manual control] started moving ${direction}`);
    },
    [activeConnection, bluetoothService, setErrorState],
  );

  const handleManualControlRelease = useCallback<
    (direction: ControlDirection) => Promise<void>
  >(
    async direction => {
      if (activeConnection === null) {
        return;
      }

      try {
        await bluetoothService.sendCommand(MowerCommand.StopInManual);
      } catch (e) {
        console.error(e);

        if (e instanceof Error) {
          setErrorState(e.message);
        } else if (typeof e === 'string') {
          setErrorState(e);
        }
      }
      console.debug(`[manual control] stopped moving ${direction}`);
    },
    [activeConnection, bluetoothService, setErrorState],
  );

  const shouldShowEmptyStatePlaceholder = useMemo(
    () => activeConnection === null && eventsToShowOnMap.length === 0,
    [activeConnection, eventsToShowOnMap],
  );

  const shouldShowMap = useMemo(
    () => !shouldShowEmptyStatePlaceholder,
    [shouldShowEmptyStatePlaceholder],
  );

  const shouldShowManualControls = useMemo(
    () => !shouldShowEmptyStatePlaceholder && mowerMode === 'manual',
    [mowerMode, shouldShowEmptyStatePlaceholder],
  );

  const shouldShowAutonomousControls = useMemo(
    () => !shouldShowEmptyStatePlaceholder && mowerMode === 'automatic',
    [mowerMode, shouldShowEmptyStatePlaceholder],
  );

  return (
    <View style={[componentStyles.pageContainer]}>
      {shouldShowEmptyStatePlaceholder && (
        <View style={styles.centeredContent}>
          <Text style={[styles.textNormal, componentStyles.emptyStateText]}>
            {t('routes.map.noMowerConnectedText')}
          </Text>
          <View style={componentStyles.emptyStateIcon}>
            <MowESleepingIcon size={225} darkModeInverted={isInDarkMode} />
          </View>
        </View>
      )}
      {shouldShowMap && (
        <View style={componentStyles.map}>
          <MowerMap events={eventsToShowOnMap} />
        </View>
      )}
      {shouldShowManualControls && (
        <ManualMowerControls
          onControlPressStart={handleManualControlPress}
          onControlPressStop={handleManualControlRelease}
        />
      )}
      {shouldShowAutonomousControls && (
        <MowerOnOffButton
          onStartPress={handleMowerStartPress}
          onStopPress={handleMowerStopInAutomaticPress}
        />
      )}
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  pageContainer: {padding: spacing.m, height: '100%'},
  emptyStateText: {paddingBottom: spacing.xxl},
  emptyStateIcon: {position: 'absolute', bottom: spacing.xxl},
  map: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export default MapPage;
