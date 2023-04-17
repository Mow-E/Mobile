import {Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import useStyles from '../hooks/useStyles';

/**
 * The page that shows the history of images that the mower took.
 */
function ImageHistoryPage(): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <View style={styles.centeredContent}>
      <Text style={styles.textNormal}>
        {t('routes.imageHistory.pagePlaceholder')}
      </Text>
    </View>
  );
}

export default ImageHistoryPage;
