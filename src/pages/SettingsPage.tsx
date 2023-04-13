import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles/styles';
import {useTranslation} from 'react-i18next';

/**
 * The page that lets the user customize general settings of the application.
 */
function SettingsPage(): JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.centeredContent}>
      <Text>{t('routes.settings.pagePlaceholder')}</Text>
    </View>
  );
}

export default SettingsPage;
