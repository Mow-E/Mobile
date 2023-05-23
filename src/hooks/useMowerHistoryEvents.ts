import {createContext, useContext} from 'react';

import MowerHistoryEvent from '../models/MowerHistoryEvent';

/**
 * The properties saved in the `MowerHistoryEventsContext`.
 */
interface MowerHistoryEventsContextType {
  /**
   * The events emitted from mowers.
   */
  events: MowerHistoryEvent[];
  /**
   * Sets the new events.
   *
   * @param events MowerHistoryEvent[] the events to set.
   */
  setEvents: (events: MowerHistoryEvent[]) => void;
}

/**
 * Context that stores the currently cached mower history events and a set them.
 */
export const MowerHistoryEventsContext =
  createContext<MowerHistoryEventsContextType>({
    events: [],
    setEvents: () => {},
  });

/**
 * Returns the currently cached mower history events and a function to set them.
 */
const useMowerHistoryEvents = () => useContext(MowerHistoryEventsContext);

export default useMowerHistoryEvents;
