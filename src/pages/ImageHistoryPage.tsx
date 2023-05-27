import {FlatList, StyleSheet, Text, View} from 'react-native';
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
import useStyles from '../hooks/useStyles';
import CameraIcon from '../assets/icons/CameraIcon';
import useIsInDarkMode from '../hooks/useIsInDarkMode';
import {useTranslation} from 'react-i18next';

/**
 * The page that shows the history of images that the mower took.
 */
function ImageHistoryPage(): JSX.Element {
  const {events, setEvents} = useMowerHistoryEvents();
  const [loading, setLoading] = useState<boolean>(false);
  const {activeConnection} = useActiveMowerConnection();
  const {sessionsToShow} = useMowingSessionsToShowInHistory();
  const apiService = useApiService();
  const styles = useStyles();
  const isInDarkMode = useIsInDarkMode();
  const {t} = useTranslation();

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
      {items.length === 0 && (
        <View
          style={[styles.centeredContent, componentStyles.emptyStateContainer]}>
          <Text style={[styles.textNormal, componentStyles.emptyStateText]}>
            {t('routes.imageHistory.emptyListText')}
          </Text>
          <View style={componentStyles.emptyStateIcon}>
            <CameraIcon size={225} darkModeInverted={isInDarkMode} />
          </View>
        </View>
      )}
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  pageContainer: {
    gap: spacing.l,
    height: '100%',
  },
  list: {padding: spacing.l},
  emptyStateContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    paddingHorizontal: spacing.l,
    // Make sure the state is rendered under the list so the pull-to-refresh of the list still works
    zIndex: -1,
  },
  emptyStateText: {paddingBottom: spacing.xxl},
  emptyStateIcon: {position: 'absolute', bottom: spacing.xxl},
});

export default ImageHistoryPage;
