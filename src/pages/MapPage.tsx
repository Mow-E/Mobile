import {Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import useStyles from '../hooks/useStyles';

/**
 * The page that visualizes the mowers position and path.
 */
function MapPage(): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <View style={styles.centeredContent}>
      <Text style={styles.textNormal}>{t('routes.map.pagePlaceholder')}</Text>
    </View>
  );
}

export default MapPage;
