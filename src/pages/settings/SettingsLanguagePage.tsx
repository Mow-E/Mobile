import React, {useCallback, useMemo} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import useStyles from '../../hooks/useStyles';
import {SettingsRoutes} from '../navigation';
import spacing from '../../styles/spacing';
import LineListItemSeparator from '../../components/common/LineListItemSeparator';
import {useTranslation} from 'react-i18next';
import {INFO_ICON_SIZE} from '../../components/mower-connections/MowerConnectionInfoButton';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import CheckMarkIcon from '../../assets/icons/CheckMarkIcon';
import useStorageService, {
  LANGUAGE_STORAGE_KEY,
} from '../../hooks/useStorageService';

function SettingsLanguagePage({}: StackScreenProps<
  SettingsRoutes,
  'SettingsLanguage'
>): JSX.Element {
  const styles = useStyles();
  const {t, i18n} = useTranslation();
  const isInDarkMode = useIsInDarkMode();
  const storageService = useStorageService();

  const informationItems = useMemo(
    () => [
      {
        label: t('routes.settings.settingsLanguageDetails.en')!,
        languageCode: 'en',
      },
      {
        label: t('routes.settings.settingsLanguageDetails.de')!,
        languageCode: 'de',
      },
      {
        label: t('routes.settings.settingsLanguageDetails.sv')!,
        languageCode: 'sv',
      },
    ],
    [t],
  );

  const handleLanguageChange = useCallback<(languageCode: string) => void>(
    languageCode => {
      i18n
        .changeLanguage(languageCode)
        .then(() => storageService.store(LANGUAGE_STORAGE_KEY, languageCode));
    },
    [i18n, storageService],
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
            onPress={() => handleLanguageChange(item.languageCode)}
            style={componentStyles.container}>
            <Text style={[styles.textNormal, componentStyles.label]}>
              {item.label}
            </Text>
            {item.languageCode === i18n.language && (
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

export default SettingsLanguagePage;
