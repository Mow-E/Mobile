import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import useStyles from '../../hooks/useStyles';
import colors from '../../styles/colors';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';

/**
 * A backdrop on the parent view by putting a semi-transparent background color
 * on top of the page and rendering the children in the center.
 * Best placed besides the most high-level page container.
 */
function Backdrop({children}: PropsWithChildren<{}>): JSX.Element {
  const isInDarkMode = useIsInDarkMode();
  const styles = useStyles();

  return (
    <View
      style={[
        componentStyles.container,
        isInDarkMode
          ? componentStyles.backgroundDark
          : componentStyles.backgroundLight,
        styles.centeredContent,
      ]}>
      {children}
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
  },
  backgroundLight: {
    backgroundColor: colors.gray['50'] + colors.opacitySuffix['80%'],
  },
  backgroundDark: {
    backgroundColor: colors.gray['700'] + colors.opacitySuffix['80%'],
  },
});

export default Backdrop;
