import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import useActiveMowerConnection, {
  MowerConnection,
} from '../../hooks/useActiveMowerConnection';
import useStyles from '../../hooks/useStyles';
import SectionWithHeading from '../../components/common/SectionWithHeading';
import ModeSelect from '../../components/common/ModeSelect';
import {MowerConnectionsRoutes} from '../navigation';
import spacing from '../../styles/spacing';
import ActiveMowerConnectionListItem from '../../components/mower-connections/ActiveMowerConnectionListItem';
import AvailableMowerConnectionsList from '../../components/mower-connections/AvailableMowerConnectionsList';
import AutomaticModeIcon from '../../assets/icons/AutomaticModeIcon';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import ManualModeIcon from '../../assets/icons/ManualModeIcon';
import useAvailableMowerConnections from '../../hooks/useAvailableMowerConnections';
import useMowerMode, {MowerMode} from '../../hooks/useMowerMode';
import useBluetoothService, {
  MowerCommand,
} from '../../hooks/useBluetoothService';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import Button from '../../components/common/Button';
import useErrorState from '../../hooks/useErrorState';

/**
 * Section that allows the selection of the mower mode, which is either 'automatic' or 'manual'.
 */
function MowerModeSelection(): JSX.Element {
  const {activeConnection, setActiveConnection} = useActiveMowerConnection();
  const {mowerMode, setMowerMode} = useMowerMode();
  const bluetoothService = useBluetoothService();
  const {t} = useTranslation();
  const isInDarkMode = useIsInDarkMode();

  const handleModeChange = useCallback<(newMode: MowerMode) => void>(
    newMode => {
      setMowerMode(newMode);

      if (activeConnection !== null) {
        bluetoothService
          .sendCommand(
            newMode === 'manual'
              ? MowerCommand.ChangeModeToManual
              : MowerCommand.ChangeModeToAutomatic,
          )
          .then(() => {
            setActiveConnection({
              ...activeConnection,
              state: 'off',
            });
          });
      }
    },
    [setMowerMode, bluetoothService, activeConnection, setActiveConnection],
  );

  return (
    <SectionWithHeading
      heading={
        t('routes.mowerConnections.mowerConnectionsList.drivingMode.heading')!
      }>
      <ModeSelect
        activeMode={mowerMode}
        setActiveMode={handleModeChange}
        modes={[
          {
            name: 'automatic',
            display: (
              <View style={componentStyles.modeIcon}>
                <AutomaticModeIcon size={12} darkModeInverted={isInDarkMode} />
              </View>
            ),
          },
          {
            name: 'manual',
            display: (
              <View style={componentStyles.modeIcon}>
                <ManualModeIcon size={12} darkModeInverted={isInDarkMode} />
              </View>
            ),
          },
        ]}
      />
    </SectionWithHeading>
  );
}

/**
 * Shows the available mower connections and lets the user select the mode of the current mower.
 * See `/src/pages/navigation.ts` for details on the props.
 */
function MowerConnectionsListPage({
  navigation,
}: StackScreenProps<
  MowerConnectionsRoutes,
  'MowerConnectionsList'
>): JSX.Element {
  const {availableConnections} = useAvailableMowerConnections();
  const {activeConnection} = useActiveMowerConnection();
  const {setErrorState} = useErrorState();
  const [connectingToMower, setConnectingToMower] = useState<boolean>(false);
  const [searchingForMowers, setSearchingForMowers] = useState<boolean>(false);
  const {t} = useTranslation();
  const styles = useStyles();
  const bluetoothService = useBluetoothService();

  const handleSelectConnection = useCallback<
    (connection: MowerConnection) => void
  >(
    async connection => {
      setConnectingToMower(true);
      try {
        await bluetoothService.connect(connection);
      } catch (e) {
        console.error(e);

        if (e instanceof Error) {
          setErrorState(e.message);
        } else if (typeof e === 'string') {
          setErrorState(e);
        }
      }
      setConnectingToMower(false);
    },
    [bluetoothService, setErrorState],
  );

  const handleScanForDevices = useCallback(async () => {
    setSearchingForMowers(true);
    try {
      await bluetoothService.stopScanForDevices();
      await bluetoothService.scanForDevices();
    } catch (e) {
      console.error(e);

      if (e instanceof Error) {
        setErrorState(e.message);
      } else if (typeof e === 'string') {
        setErrorState(e);
      }
    }
    setSearchingForMowers(false);
  }, [bluetoothService, setErrorState]);

  const handleOpenConnectionInfo = useCallback<
    (connection: MowerConnection) => void
  >(
    connection => navigation.navigate('MowerConnectionDetails', {connection}),
    [navigation],
  );

  const handleCancelScanForDevices = useCallback(async () => {
    try {
      await bluetoothService.stopScanForDevices();
    } catch (e) {
      console.error(e);

      if (e instanceof Error) {
        setErrorState(e.message);
      } else if (typeof e === 'string') {
        setErrorState(e);
      }
    } finally {
      setSearchingForMowers(false);
    }
  }, [bluetoothService, setErrorState]);

  const availableConnectionsWithoutActiveOne = useMemo(() => {
    return Array.from(availableConnections.values())
      .filter(({id, bluetoothInfos}) => {
        if (activeConnection === null) {
          return true;
        }

        if (bluetoothInfos && activeConnection.bluetoothInfos) {
          return bluetoothInfos.id !== activeConnection.bluetoothInfos.id;
        }

        return id !== activeConnection.id;
      })
      .sort((a, b) => {
        if (a.bluetoothInfos === undefined && b.bluetoothInfos === undefined) {
          return 0;
        }

        if (a.bluetoothInfos === undefined) {
          return 1;
        }

        if (b.bluetoothInfos === undefined) {
          return -1;
        }

        return (
          b.bluetoothInfos.rssiWhenDiscovered -
          a.bluetoothInfos.rssiWhenDiscovered
        );
      });
  }, [activeConnection, availableConnections]);

  return (
    <>
      <LoadingOverlay
        text={
          t(
            'routes.mowerConnections.mowerConnectionsList.availableConnections.connectingLabel',
          )!
        }
        visible={connectingToMower}
      />
      <LoadingOverlay
        text={
          t(
            'routes.mowerConnections.mowerConnectionsList.availableConnections.searchingLabel',
          )!
        }
        visible={searchingForMowers}
        onClose={handleCancelScanForDevices}
      />
      <View
        style={[
          styles.flexColumn,
          {
            marginTop: spacing.xxl,
            marginHorizontal: spacing.l,
            gap: spacing.xl,
          },
        ]}>
        <SectionWithHeading
          heading={
            t(
              'routes.mowerConnections.mowerConnectionsList.activeConnection.heading',
            )!
          }>
          <View style={styles.border}>
            <ActiveMowerConnectionListItem
              onOpenConnectionInfo={handleOpenConnectionInfo}
            />
          </View>
        </SectionWithHeading>
        <SectionWithHeading>
          <Button
            label={
              t(
                'routes.mowerConnections.mowerConnectionsList.searchForConnections.buttonLabel',
              )!
            }
            onPress={handleScanForDevices}
            fullWidth
            testID="searchForDevicesButton"
          />
        </SectionWithHeading>
        <SectionWithHeading
          heading={
            t(
              'routes.mowerConnections.mowerConnectionsList.availableConnections.heading',
            )!
          }>
          <View style={componentStyles.listContainer}>
            <AvailableMowerConnectionsList
              availableConnections={availableConnectionsWithoutActiveOne}
              onSelectConnection={handleSelectConnection}
              onOpenConnectionInfo={handleOpenConnectionInfo}
            />
          </View>
        </SectionWithHeading>
        <MowerModeSelection />
      </View>
    </>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  modeIcon: {
    margin: spacing.xs,
  },
  listContainer: {
    maxHeight: 200,
  },
});

export default MowerConnectionsListPage;
