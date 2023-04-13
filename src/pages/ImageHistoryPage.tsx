import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles/styles';
import {useTranslation} from 'react-i18next';

/**
 * The page that shows the history of images that the mower took.
 */
function ImageHistoryPage(): JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.centeredContent}>
      <Text>{t('routes.imageHistory.pagePlaceholder')}</Text>
    </View>
  );
}

export default ImageHistoryPage;
