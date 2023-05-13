import {createContext, useContext} from 'react';

/**
 * A mode a mower can have.
 */
export type MowerMode = 'automatic' | 'manual';

/**
 * The properties saved in the `MowerModeContext`.
 */
interface MowerModeContextType {
  /**
   * The current mower mode.
   */
  mowerMode: MowerMode;
  /**
   * Setter for the current mower mode.
   *
   * @param mode MowerMode the new mower mode.
   */
  setMowerMode: (mode: MowerMode) => void;
}

/**
 * Context that stores the current mower mode and a setter to change it.
 */
export const MowerModeContext = createContext<MowerModeContextType>({
  mowerMode: 'automatic',
  setMowerMode: () => {},
});

/**
 * Returns the current mower mode and a setter to change it.
 */
const useMowerMode = () => useContext(MowerModeContext);

export default useMowerMode;
