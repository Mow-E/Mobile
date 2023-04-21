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

/**
 * Section that allows the selection of the mower mode, which is either 'automatic' or 'manual'.
 */
function MowerModeSelection(): JSX.Element {
  const [activeMode, setActiveMode] = useState<'automatic' | 'manual'>(
    'automatic',
  );
  const {t} = useTranslation();
  const isInDarkMode = useIsInDarkMode();

  return (
    <SectionWithHeading
      heading={
        t('routes.mowerConnections.mowerConnectionsList.drivingMode.heading')!
      }>
      <ModeSelect
        activeMode={activeMode}
        setActiveMode={setActiveMode}
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
  const {activeConnection, setActiveConnection} = useActiveMowerConnection();
  const {t} = useTranslation();
  const styles = useStyles();

  const handleSelectConnection = useCallback<
    (connection: MowerConnection) => void
  >(connection => setActiveConnection?.(connection), [setActiveConnection]);

  const handleOpenConnectionInfo = useCallback<
    (connection: MowerConnection) => void
  >(
    connection => navigation.navigate('MowerConnectionDetails', {connection}),
    [navigation],
  );

  const availableConnectionsWithoutActiveOne = useMemo(
    () => availableConnections.filter(({id}) => id !== activeConnection?.id),
    [activeConnection, availableConnections],
  );

  return (
    <View
      style={[
        styles.flexColumn,
        {marginTop: spacing.xxl, marginHorizontal: spacing.l, gap: spacing.xl},
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
      <SectionWithHeading
        heading={
          t(
            'routes.mowerConnections.mowerConnectionsList.availableConnections.heading',
          )!
        }>
        <AvailableMowerConnectionsList
          availableConnections={availableConnectionsWithoutActiveOne}
          onSelectConnection={handleSelectConnection}
          onOpenConnectionInfo={handleOpenConnectionInfo}
        />
      </SectionWithHeading>
      <MowerModeSelection />
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  modeIcon: {
    margin: spacing.xs,
  },
});

export default MowerConnectionsListPage;
