import useIsInDarkMode from './useIsInDarkMode';
import {darkModeStyles, generalStyles, lightModeStyles} from '../styles/styles';
import {StyleSheet} from 'react-native';

/**
 * Gets the global styles of the application, based on whether the app is in dark mode.
 */
function useStyles() {
  const isInDarkMode = useIsInDarkMode();

  return StyleSheet.create({
    ...generalStyles,
    ...(isInDarkMode ? darkModeStyles : lightModeStyles),
  });
}

export default useStyles;
