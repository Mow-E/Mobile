import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useApiService from '../hooks/useApiService';
import spacing from '../styles/spacing';
import {
  isEventWithImageAttached,
  mowerHistoryEventToImageHistoryItem,
} from '../services/mower-history-event';
import ImageHistoryItem from '../models/ImageHistoryItem';
import MowerHistoryEventImageListItem from '../components/image-history/MowerHistoryEventImageListItem';
import useActiveMowerConnection from '../hooks/useActiveMowerConnection';

/**
 * The page that shows the history of images that the mower took.
 */
function ImageHistoryPage(): JSX.Element {
  const [items, setItems] = useState<ImageHistoryItem[] | null>(null);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const {activeConnection} = useActiveMowerConnection();
  const apiService = useApiService();

  const fetchAndUpdateItems = useCallback(async () => {
    setLoadingItems(true);

    const fetchedItems = await apiService.getMowerHistory();
    const itemsOfActiveMower =
      activeConnection !== null
        ? fetchedItems.filter(item => item.mowerId === activeConnection.id)
        : fetchedItems;

    const itemsWithImages = itemsOfActiveMower
      .filter(isEventWithImageAttached)
      .map(mowerHistoryEventToImageHistoryItem)
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    setItems(itemsWithImages);
    setLoadingItems(false);
  }, [apiService, activeConnection]);

  useEffect(() => {
    if (items === null && !loadingItems) {
      fetchAndUpdateItems();
    }
  }, [items, loadingItems, fetchAndUpdateItems]);

  return (
    <View style={componentStyles.pageContainer}>
      <FlatList
        style={componentStyles.list}
        data={items ?? []}
        onRefresh={fetchAndUpdateItems}
        refreshing={loadingItems}
        renderItem={({item}) => <MowerHistoryEventImageListItem item={item} />}
      />
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  pageContainer: {
    gap: spacing.l,
  },
  list: {padding: spacing.l},
});

export default ImageHistoryPage;
