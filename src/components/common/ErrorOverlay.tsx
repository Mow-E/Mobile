import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Backdrop from '../common/Backdrop';
import useStyles from '../../hooks/useStyles';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import XIcon from '../../assets/icons/XIcon';

/**
 * The properties of <ErrorOverlay />.
 */
interface ErrorOverlayProps {
  /**
   * The text/label shown in the overlay.
   */
  text: string;
  /**
   * Whether the overlay is visible.
   */
  visible?: boolean;
  /**
   * Called when the overlay should be closed.
   */
  onClose?: () => void;
}

/**
 * Shows an overlay with an animated mow-e icon and a label.
 */
function ErrorOverlay({
  text,
  visible = false,
  onClose,
}: ErrorOverlayProps): JSX.Element {
  const styles = useStyles();
  const isInDarkMode = useIsInDarkMode();

  return (
    <>
      {visible && (
        <Backdrop opacity={colors.opacitySuffix['0%']} onPress={onClose}>
          <View
            style={[
              styles.flexColumn,
              componentStyles.container,
              isInDarkMode
                ? componentStyles.darkModeBorder
                : componentStyles.lightModeBorder,
            ]}>
            <XIcon
              size={100}
              colored={isInDarkMode ? colors.red.light : colors.red.dark}
            />
            <Text style={[styles.textNormal, componentStyles.label]}>
              {text}
            </Text>
          </View>
        </Backdrop>
      )}
    </>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    paddingVertical: spacing.l,
    backgroundColor: colors.gray['300'] + colors.opacitySuffix['80%'],
    alignItems: 'center',
    gap: spacing.m,
    borderWidth: 2,
    // Shadow for iOS
    shadowColor: colors.gray['950'],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  lightModeBorder: {
    borderColor: colors.red.dark,
  },
  darkModeBorder: {
    borderColor: colors.red.light,
  },
  label: {textAlign: 'center'},
});

export default ErrorOverlay;
