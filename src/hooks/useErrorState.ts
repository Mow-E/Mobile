import {createContext, useContext} from 'react';

/**
 * An error state the app can have.
 */
export type ErrorState = string | null;

/**
 * The properties saved in the `ErrorStateContext`.
 */
interface ErrorStateContextType {
  /**
   * The current error state.
   */
  errorState: ErrorState;
  /**
   * Setter for the current error state.
   *
   * @param errorState ErrorState the new error state.
   */
  setErrorState: (errorState: ErrorState) => void;
}

/**
 * Context that stores the current error state and a setter to change it.
 */
export const ErrorStateContext = createContext<ErrorStateContextType>({
  errorState: null,
  setErrorState: () => {},
});

/**
 * Returns the current error state and a setter to change it.
 */
const useErrorState = () => useContext(ErrorStateContext);

export default useErrorState;
