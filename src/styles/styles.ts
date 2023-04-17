import {StyleSheet} from 'react-native';
import colors from './colors';

/**
 * Dark mode specific styles to be used throughout the application.
 */
export const darkModeStyles = StyleSheet.create({
  textNormal: {
    color: colors.gray['50'],
  },
});

/**
 * Light mode specific styles to be used throughout the application.
 */
export const lightModeStyles = StyleSheet.create({
  textNormal: {
    color: colors.gray['950'],
  },
});

/**
 * Global styles to be used throughout the application.
 * Not for individual component styles.
 * These styles form the consistency of the look-and-feel of the application.
 */
export const generalStyles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
