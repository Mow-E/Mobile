import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles/styles';
import {useTranslation} from 'react-i18next';

/**
 * The page that shows available mowers to connect to and handle these connections.
 */
function MowerConnectionsPage(): JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.centeredContent}>
      <Text>{t('routes.mowerConnections.pagePlaceholder')}</Text>
    </View>
  );
}

export default MowerConnectionsPage;
