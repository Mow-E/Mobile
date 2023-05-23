import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useApiService from '../hooks/useApiService';
import spacing from '../styles/spacing';
import {
  getLatestSessionId,
  isEventToShowDependingOnSessionId,
  isEventWithImageAttached,
  mowerHistoryEventToImageHistoryItem,
} from '../services/mower-history-event';
import ImageHistoryItem from '../models/ImageHistoryItem';
import MowerHistoryEventImageListItem from '../components/image-history/MowerHistoryEventImageListItem';
import useActiveMowerConnection from '../hooks/useActiveMowerConnection';
import useMowerHistoryEvents from '../hooks/useMowerHistoryEvents';
import useMowingSessionsToShowInHistory from '../hooks/useMowingSessionsToShowInHistory';

/**
 * The page that shows the history of images that the mower took.
 */
function ImageHistoryPage(): JSX.Element {
  const {events, setEvents} = useMowerHistoryEvents();
  const [loading, setLoading] = useState<boolean>(false);
  const {activeConnection} = useActiveMowerConnection();
  const {sessionsToShow} = useMowingSessionsToShowInHistory();
  const apiService = useApiService();

  const fetchAndUpdateEvents = useCallback(async () => {
    setLoading(true);

    const fetchedEvents = await apiService.getMowerHistory();
    setEvents(fetchedEvents);

    setLoading(false);
  }, [apiService, setEvents]);

  useEffect(() => {
    fetchAndUpdateEvents();
    // This effect should only be run once, when the component is created, thus no dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = useMemo<ImageHistoryItem[]>(() => {
    const itemsOfActiveMower =
      activeConnection !== null
        ? events.filter(item => item.mowerId === activeConnection.id)
        : events;

    const latestSessionId = getLatestSessionId(itemsOfActiveMower);

    return itemsOfActiveMower
      .filter(item =>
        isEventToShowDependingOnSessionId(
          item,
          latestSessionId,
          sessionsToShow,
        ),
      )
      .filter(isEventWithImageAttached)
      .map(mowerHistoryEventToImageHistoryItem)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [events, activeConnection, sessionsToShow]);

  return (
    <View style={componentStyles.pageContainer}>
      <FlatList
        style={componentStyles.list}
        data={items ?? []}
        onRefresh={fetchAndUpdateEvents}
        refreshing={loading}
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
