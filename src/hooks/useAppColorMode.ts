import {createContext, useContext} from 'react';

/**
 * A color mode the app can have.
 */
export type AppColorMode = 'auto' | 'dark' | 'light';

/**
 * The properties saved in the `AppColorModeContext`.
 */
interface AppColorModeContextType {
  /**
   * The current color mode.
   */
  appColorMode: AppColorMode;
  /**
   * Setter for the current color mode.
   *
   * @param mode AppColorMode the new color mode.
   */
  setAppColorMode: (mode: AppColorMode) => void;
}

/**
 * Context that stores the current color mode and a setter to change it.
 */
export const AppColorModeContext = createContext<AppColorModeContextType>({
  appColorMode: 'auto',
  setAppColorMode: () => {},
});

/**
 * Returns the current color mode and a setter to change it.
 */
const useAppColorMode = () => useContext(AppColorModeContext);

export default useAppColorMode;
