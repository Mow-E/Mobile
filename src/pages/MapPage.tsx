import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles/styles';
import {useTranslation} from 'react-i18next';

/**
 * The page that visualizes the mowers position and path.
 */
function MapPage(): JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.centeredContent}>
      <Text>{t('routes.map.pagePlaceholder')}</Text>
    </View>
  );
}

export default MapPage;
