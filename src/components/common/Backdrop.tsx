import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import useStyles from '../../hooks/useStyles';
import colors from '../../styles/colors';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';

/**
 * The properties of <Backdrop />.
 */
interface BackdropProps {
  /**
   * Opacity value the backdrop background should have, as a hex string;
   */
  opacity?: string;
  /**
   * Called when the background of the overlay is pressed.
   */
  onPress?: () => void;
}

/**
 * A backdrop on the parent view by putting a semi-transparent background color
 * on top of the page and rendering the children in the center.
 * Best placed besides the most high-level page container.
 */
function Backdrop({
  opacity = colors.opacitySuffix['80%'],
  onPress = () => {},
  children,
}: PropsWithChildren<BackdropProps>): JSX.Element {
  const isInDarkMode = useIsInDarkMode();
  const styles = useStyles();

  return (
    <Pressable
      style={[
        componentStyles.container,
        {
          backgroundColor:
            (isInDarkMode
              ? componentStyles.backgroundDark
              : componentStyles.backgroundLight
            ).backgroundColor + opacity,
        },
        styles.centeredContent,
      ]}
      onPress={onPress}>
      {children}
    </Pressable>
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
    backgroundColor: colors.gray['50'],
  },
  backgroundDark: {
    backgroundColor: colors.gray['700'],
  },
});

export default Backdrop;
