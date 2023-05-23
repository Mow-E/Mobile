import React, {useMemo} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import useStyles from '../../hooks/useStyles';
import {SettingsRoutes} from '../navigation';
import spacing from '../../styles/spacing';
import LineListItemSeparator from '../../components/common/LineListItemSeparator';
import {useTranslation} from 'react-i18next';
import CheckMarkIcon from '../../assets/icons/CheckMarkIcon';
import {INFO_ICON_SIZE} from '../../components/mower-connections/MowerConnectionInfoButton';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import useMowingSessionsToShowInHistory, {
  MowingSessionsToShowInHistory,
} from '../../hooks/useMowingSessionsToShowInHistory';

function SettingsMowingSessionsToShowInHistoryPage({}: StackScreenProps<
  SettingsRoutes,
  'SettingsMowingSessionsToShowInHistory'
>): JSX.Element {
  const styles = useStyles();
  const {t} = useTranslation();
  const isInDarkMode = useIsInDarkMode();
  const {sessionsToShow, setSessionsToShow} =
    useMowingSessionsToShowInHistory();
  const informationItems = useMemo<
    {label: string; sessionsCode: MowingSessionsToShowInHistory}[]
  >(
    () => [
      {
        label: t(
          'routes.settings.settingsMowingSessionsToShowInHistoryDetails.latestSession',
        )!,
        sessionsCode: MowingSessionsToShowInHistory.latestSession,
      },
      {
        label: t(
          'routes.settings.settingsMowingSessionsToShowInHistoryDetails.lastThreeSessions',
        )!,
        sessionsCode: MowingSessionsToShowInHistory.lastThreeSessions,
      },
      {
        label: t(
          'routes.settings.settingsMowingSessionsToShowInHistoryDetails.lastTenSessions',
        )!,
        sessionsCode: MowingSessionsToShowInHistory.lastTenSessions,
      },
      {
        label: t(
          'routes.settings.settingsMowingSessionsToShowInHistoryDetails.allSessions',
        )!,
        sessionsCode: MowingSessionsToShowInHistory.allSessions,
      },
    ],
    [t],
  );

  return (
    <View
      style={[
        styles.flexColumn,
        {marginTop: spacing.xxl, marginHorizontal: spacing.l, gap: spacing.xl},
      ]}>
      <FlatList
        data={informationItems}
        contentContainerStyle={styles.border}
        ItemSeparatorComponent={LineListItemSeparator}
        renderItem={({item}) => (
          <Pressable
            onPress={() => setSessionsToShow?.(item.sessionsCode)}
            style={componentStyles.container}>
            <Text style={[styles.textNormal, componentStyles.label]}>
              {item.label}
            </Text>
            {item.sessionsCode === sessionsToShow && (
              <View style={componentStyles.button}>
                <CheckMarkIcon
                  size={INFO_ICON_SIZE}
                  darkModeInverted={isInDarkMode}
                />
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // This provides an even height for all list items, even if some have no info button
    // height = info + (2 * padding)
    height: INFO_ICON_SIZE + 2 * spacing.sm,
  },
  label: {
    padding: spacing.sm,
    flexGrow: 1,
  },
  button: {
    justifyContent: 'center',
    padding: spacing.sm,
  },
});

export default SettingsMowingSessionsToShowInHistoryPage;
