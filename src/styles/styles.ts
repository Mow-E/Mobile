import {StyleSheet} from 'react-native';
import colors from './colors';

/**
 * Dark mode specific styles to be used throughout the application.
 */
export const darkModeStyles = StyleSheet.create({
  textNormal: {
    color: colors.gray['50'],
  },
  layoutTabBarActiveTintColor: {
    color: colors.secondary.light,
  },
  layoutHeaderStyle: {
    backgroundColor: colors.gray['700'],
  },
  layoutHeaderTitleStyle: {
    color: colors.gray['50'],
  },
  layoutTabBarStyle: {
    backgroundColor: colors.gray['700'],
  },
  layoutSceneContainerStyle: {
    backgroundColor: colors.gray['500'],
  },
});

/**
 * Light mode specific styles to be used throughout the application.
 */
export const lightModeStyles = StyleSheet.create({
  textNormal: {
    color: colors.gray['950'],
  },
  layoutTabBarActiveTintColor: {
    color: colors.secondary.dark,
  },
  layoutHeaderStyle: {
    backgroundColor: colors.gray['50'],
  },
  layoutHeaderTitleStyle: {
    color: colors.gray['950'],
  },
  layoutTabBarStyle: {
    backgroundColor: colors.gray['50'],
  },
  layoutSceneContainerStyle: {
    backgroundColor: colors.gray['100'],
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
