import {Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import useStyles from '../hooks/useStyles';

/**
 * The page that lets the user customize general settings of the application.
 */
function SettingsPage(): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <View style={styles.centeredContent}>
      <Text style={styles.textNormal}>
        {t('routes.settings.pagePlaceholder')}
      </Text>
    </View>
  );
}

export default SettingsPage;
