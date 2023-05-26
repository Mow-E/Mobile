import MowerHistoryEventMowerState from './MowerHistoryEventMowerState';

/**
 * An event that has been reported by a mower.
 * It always contains its position and state, with some other data.
 */
interface MowerHistoryEvent {
  /**
   * The source where the event came from.
   * Can either be from a websocket connection or the (REST) api.
   */
  source: 'websocket' | 'api';
  /**
   * The id of the mowing session the event occured in.
   */
  sessionId: number;
  /**
   * The id of the mower that reported the event.
   */
  mowerId: string;
  /**
   * The x position the mower was at when the event occured.
   */
  x: number;
  /**
   * The y position the mower was at when the event occured.
   */
  y: number;
  /**
   * The angle the mower had when the event occured.
   * Its a number in degrees (0.0 .. 360.0).
   */
  z: number;
  /**
   * The time the event occured at (as a timestamp).
   */
  time: number;
  /**
   * The state the mower had when the event occured.
   */
  state: MowerHistoryEventMowerState;
  /**
   * Optional id of an image that is associated with the event, e.g. an image the mower took when avoiding a collision.
   */
  imageId: string | null;
  /**
   * Extra data for the event.
   * If the event contains an image (imageId !== null), this field contains classification results for the image, or an empty string otherwise.
   *
   * The classification results are a map of label (string) to its probability.
   * E.g.: "{Foo=0.92141,Bar=0.125151,Foo Bar=0.2718283}"
   */
  extra: string;
}

export default MowerHistoryEvent;
