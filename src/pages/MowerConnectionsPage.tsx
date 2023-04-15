import {Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import useStyles from '../hooks/useStyles';

/**
 * The page that shows available mowers to connect to and handle these connections.
 */
function MowerConnectionsPage(): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <View style={styles.centeredContent}>
      <Text style={styles.textNormal}>
        {t('routes.mowerConnections.pagePlaceholder')}
      </Text>
    </View>
  );
}

export default MowerConnectionsPage;
