import MowerHistoryEvent from '../models/MowerHistoryEvent';
import ImageHistoryItem, {
  ImageClassificationResult,
} from '../models/ImageHistoryItem';
import {MowingSessionsToShowInHistory} from '../hooks/useMowingSessionsToShowInHistory';

/** Map of labels and their probabilities as a result of a classification of an image. */
export type MowerHistoryEventImageClassificationResults = Map<string, number>;

/**
 * Checks whether an image is attached to a given event.
 *
 * @param event MowerHistoryEvent the event to check.
 *
 * @return boolean whether an image is attached to the event.
 */
export function isEventWithImageAttached(event: MowerHistoryEvent): boolean {
  return event.imageId !== null && event.extra.length > 0;
}

/**
 * Converts the content of an MowerHistoryEvent extra field to a MowerHistoryEventImageClassificationResults map.
 *
 * @param extra string the extra to convert
 *
 * @return MowerHistoryEventImageClassificationResults the classification results, or an empty map if extra field is empty.
 */
function mowerHistoryEventExtraToImageClassificationResults(
  extra: string,
): MowerHistoryEventImageClassificationResults {
  if (extra === '') {
    return new Map<string, number>();
  }

  return new Map<string, number>(
    extra
      .replace('{', '')
      .replace('}', '')
      .split(',')
      .map(i => i.split('=') as [string, number]),
  );
}

/**
 * Gets the classification result with the highest probability from an event.
 *
 * @param event MowerHistoryEvent the event to check.
 *
 * @return ImageClassificationResult|null the result with the highest probability, or null if no results available.
 */
function getImageClassificationResultWithHighestProbability(
  event: MowerHistoryEvent,
): ImageClassificationResult | null {
  const results = mowerHistoryEventExtraToImageClassificationResults(
    event.extra,
  );

  if (results.size === 0) {
    return null;
  }

  const [label, probability] = Array.from(results.entries()).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return {
    label,
    probability,
  };
}

/**
 * Converts a MowerHistoryEvent to an ImageHistoryItem.
 * Throws an error if the event cannot be converted, e.g. if the event has no image attached.
 *
 * @param event MowerHistoryEvent the event to convert.
 *
 * @return ImageHistoryItem converted item, with the classification result with the highest probability.
 */
export function mowerHistoryEventToImageHistoryItem(
  event: MowerHistoryEvent,
): ImageHistoryItem {
  if (!isEventWithImageAttached(event)) {
    throw new Error('Event has no image attached!');
  }

  return {
    id: event.id,
    // event.time is in seconds while `new Date()` expects milliseconds
    date: new Date(event.time * 1000),
    imageId: event.imageId!,
    classificationResult:
      getImageClassificationResultWithHighestProbability(event)!,
  };
}

/**
 * Gets the latest session id of the sessions in the given events list.
 *
 * @param events MowerHistoryEvent[] the events to get the session id from.
 *
 * @return number the latest session id, or -1 if no events given.
 */
export function getLatestSessionId(events: MowerHistoryEvent[]): number {
  return events.length > 0
    ? events.sort((a, b) => b.sessionId - a.sessionId)[0].sessionId
    : -1;
}

/**
 * Checks whether an event should be shown depending on the MowingSessionsToShowInHistory selection and the latest session id.
 *
 * @param event MowerHistoryEvent the event to check.
 * @param latestSessionId number the id of the latest session.
 * @param sessionsToShow MowingSessionsToShowInHistory the configuration to decide with whether an event should be shown.
 *
 * @return boolean whether the event should be shown.
 */
export function isEventToShowDependingOnSessionId(
  event: MowerHistoryEvent,
  latestSessionId: number,
  sessionsToShow: MowingSessionsToShowInHistory,
): boolean {
  if (sessionsToShow === MowingSessionsToShowInHistory.allSessions) {
    return true;
  }

  switch (sessionsToShow) {
    case MowingSessionsToShowInHistory.latestSession:
      return event.sessionId === latestSessionId;
    case MowingSessionsToShowInHistory.lastThreeSessions:
      return event.sessionId > latestSessionId - 3;
    case MowingSessionsToShowInHistory.lastTenSessions:
      return event.sessionId > latestSessionId - 10;
    default:
      return false;
  }
}
