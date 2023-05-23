import MowerHistoryEvent from '../models/MowerHistoryEvent';
import ImageHistoryItem, {
  ImageClassificationResult,
} from '../models/ImageHistoryItem';

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
