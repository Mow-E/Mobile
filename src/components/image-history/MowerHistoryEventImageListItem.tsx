import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import ImageHistoryItem from '../../models/ImageHistoryItem';
import {MOWER_EVENT_IMAGE_URL} from '../../services/api';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import useStyles from '../../hooks/useStyles';
import useCurrentUser from '../../hooks/useCurrentUser';

/**
 * The properties of <MowerHistoryEventImage />.
 */
interface MowerHistoryEventImageProps {
  /**
   * The item to display.
   */
  item: ImageHistoryItem;
}

/**
 * Displays an ImageHistoryItem for the mower history event images list.
 */
function MowerHistoryEventImageListItem({
  item,
}: MowerHistoryEventImageProps): JSX.Element {
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const styles = useStyles();
  const {currentUser} = useCurrentUser();
  const {t, i18n} = useTranslation();

  const humanReadableTime = useMemo<string>(() => {
    const now = new Date();

    const isToday =
      item.date.getDate() === now.getDate() &&
      item.date.getMonth() === now.getMonth() &&
      item.date.getFullYear() === now.getFullYear();

    const fullDateStringRepresentation = `${item.date.toLocaleDateString(
      i18n.language,
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: i18n.language === 'en',
      },
    )}`;

    return isToday
      ? t('routes.imageHistory.today')
      : fullDateStringRepresentation;
  }, [item, t, i18n]);

  return (
    <View
      style={[styles.flexColumn, componentStyles.container]}
      key={`mower-history-event-image-list-item-${
        item.imageId
      }-${item.date.getTime()}`}>
      <Text style={styles.textNormal}>
        {humanReadableTime} - {item.classificationResult.label}
      </Text>
      <FastImage
        style={[
          componentStyles.image,
          imageLoading && componentStyles.imagePlaceholder,
        ]}
        source={{
          uri: MOWER_EVENT_IMAGE_URL(item.imageId),
          headers: {
            Authorization: `Bearer ${currentUser?.authorizationToken}`,
            accept: 'image/jpeg',
          },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
      />
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  image: {
    height: 200,
    marginBottom: spacing.l,
  },
  imagePlaceholder: {
    backgroundColor: colors.gray['300'],
  },
  container: {gap: spacing.s},
});

export default MowerHistoryEventImageListItem;
