/**
 * A state a mower can have had in a mower history event.
 */
enum MowerHistoryEventMowerState {
  /** The mower has started at the event. */
  Start = 0,
  /** The mower was working at the event. */
  Working = 1,
  /** The mower has stopped at the event. */
  Stop = 2,
  /** The mower has had an error at the event. */
  Error = 3,
  /** The mower has avoided a collision at the event. */
  Collision = 4,
  /** The mower has hit a border at the event. */
  Border = 5,
}

export default MowerHistoryEventMowerState;
