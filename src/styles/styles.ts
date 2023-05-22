import {StyleSheet} from 'react-native';
import colors from './colors';
import spacing from './spacing';

const NORMAL_FONT_SIZE = 14;
const HEADING_FONT_SIZE = 16;

const BORDER_WIDTH = 1;
const BORDER_RADIUS = 0;

export const LIGHT_FONT_COLOR = colors.gray['50'];
export const DARK_FONT_COLOR = colors.gray['950'];

/**
 * Dark mode specific styles to be used throughout the application.
 */
export const darkModeStyles = StyleSheet.create({
  textNormal: {
    color: LIGHT_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'normal',
  },
  textNormalInverted: {
    color: DARK_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'normal',
  },
  textNormalBold: {
    color: LIGHT_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'bold',
  },
  textNormalBoldInverted: {
    color: DARK_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'bold',
  },
  textHeading: {
    color: LIGHT_FONT_COLOR,
    fontSize: HEADING_FONT_SIZE,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  textInputPlaceholder: {
    color: LIGHT_FONT_COLOR + colors.opacitySuffix['80%'],
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'normal',
  },
  border: {
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    borderColor: LIGHT_FONT_COLOR,
  },
  borderTop: {
    borderTopWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    borderColor: LIGHT_FONT_COLOR,
  },
  borderTopInverted: {
    borderTopWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    borderColor: DARK_FONT_COLOR,
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
    color: DARK_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'normal',
  },
  textNormalInverted: {
    color: LIGHT_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'normal',
  },
  textNormalBold: {
    color: DARK_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'bold',
  },
  textNormalBoldInverted: {
    color: LIGHT_FONT_COLOR,
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'bold',
  },
  textHeading: {
    color: DARK_FONT_COLOR,
    fontSize: HEADING_FONT_SIZE,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  textInputPlaceholder: {
    color: DARK_FONT_COLOR + colors.opacitySuffix['80%'],
    fontSize: NORMAL_FONT_SIZE,
    fontWeight: 'normal',
  },
  border: {
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    borderColor: DARK_FONT_COLOR,
  },
  borderTop: {
    borderTopWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    borderColor: DARK_FONT_COLOR,
  },
  borderTopInverted: {
    borderTopWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS,
    borderColor: LIGHT_FONT_COLOR,
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
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
});
