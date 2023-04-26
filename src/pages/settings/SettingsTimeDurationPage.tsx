import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import useStyles from '../../hooks/useStyles';
import {SettingsRoutes} from '../navigation';
import spacing from '../../styles/spacing';
import LineListItemSeparator from '../../components/common/LineListItemSeparator';
import {useTranslation} from 'react-i18next';

function SettingsTimeDurationPage({}: StackScreenProps<
  SettingsRoutes,
  'SettingsTimeDuration'
>): JSX.Element {
  const styles = useStyles();
  const {t} = useTranslation();

  const informationItems = useMemo(
    () => [
      {
        label: t('routes.settings.settingsTimeDurationDetails.last24Hours')!,
      },
      {
        label: t('routes.settings.settingsTimeDurationDetails.last12Hours')!,
      },
      {
        label: t('routes.settings.settingsTimeDurationDetails.last3Hours')!,
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
          <View style={componentStyles.container}>
            <Text style={[styles.textNormal, componentStyles.label]}>
              {item.label}
            </Text>
          </View>
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
  },
  label: {
    padding: spacing.sm,
    flexGrow: 1,
  },
});

export default SettingsTimeDurationPage;
