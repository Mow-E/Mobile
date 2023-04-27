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
import useShowablePathTimeDuration, {
  ShowablePathTimeDuration,
} from '../../hooks/useShowablePathTimeDuration';

function SettingsTimeDurationPage({}: StackScreenProps<
  SettingsRoutes,
  'SettingsTimeDuration'
>): JSX.Element {
  const styles = useStyles();
  const {t} = useTranslation();
  const isInDarkMode = useIsInDarkMode();
  const {timeDuration, setTimeDuration} = useShowablePathTimeDuration();
  const informationItems = useMemo<
    {label: string; timeDurationCode: ShowablePathTimeDuration}[]
  >(
    () => [
      {
        label: t('routes.settings.settingsTimeDurationDetails.last24Hours')!,
        timeDurationCode: ShowablePathTimeDuration.h24,
      },
      {
        label: t('routes.settings.settingsTimeDurationDetails.last12Hours')!,
        timeDurationCode: ShowablePathTimeDuration.h12,
      },
      {
        label: t('routes.settings.settingsTimeDurationDetails.last3Hours')!,
        timeDurationCode: ShowablePathTimeDuration.h3,
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
            onPress={() => setTimeDuration?.(item.timeDurationCode)}
            style={componentStyles.container}>
            <Text style={[styles.textNormal, componentStyles.label]}>
              {item.label}
            </Text>
            {item.timeDurationCode === timeDuration && (
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

export default SettingsTimeDurationPage;
