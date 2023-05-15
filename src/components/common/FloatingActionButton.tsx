import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import spacing from '../../styles/spacing';
import useStyles from '../../hooks/useStyles';
import colors from '../../styles/colors';
import {LIGHT_FONT_COLOR} from '../../styles/styles';

export const Z_INDEX = 100;

const BUTTON_SIZE = 64;

/**
 * The props for <FloatingActionButton />.
 */
interface FloatingActionButtonProps {
  /**
   * The label to display inside the button.
   */
  label: string;
  /**
   * Called when the button is pressed.
   */
  onPress: () => void;
  /**
   * The color to display the button in.
   */
  color?:
    | 'primary'
    | 'primary-inverted'
    | 'secondary'
    | 'secondary-inverted'
    | 'default'
    | 'default-inverted';
  /**
   * Optional test id for automated tests.
   */
  testID?: string;
}

/**
 * A button that sends a start/stop signal to the mower.
 * This component does not send the commands itself.
 * TODO: make this a general FAB.
 */
function FloatingActionButton({
  label,
  onPress,
  color = 'default',
  testID,
}: FloatingActionButtonProps): JSX.Element {
  const styles = useStyles();

  const isInvertedColor = [
    'primary-inverted',
    'secondary-inverted',
    'default-inverted',
  ].includes(color);

  return (
    <View style={componentStyles.floatingPosition}>
      <Pressable
        onPress={onPress}
        testID={testID}
        style={[
          styles.border,
          componentStyles.container,
          color === 'primary' && {
            backgroundColor: colors.primary.light,
            borderColor: colors.primary.dark,
          },
          color === 'primary-inverted' && {
            backgroundColor: colors.primary.dark,
            borderColor: colors.primary.light,
          },
          color === 'secondary' && {
            backgroundColor: colors.secondary.light,
            borderColor: colors.secondary.dark,
          },
          color === 'secondary-inverted' && {
            backgroundColor: colors.secondary.dark,
            borderColor: colors.secondary.light,
          },
          color === 'default' && {
            backgroundColor: colors.gray['300'],
            borderColor: colors.gray['400'],
          },
          color === 'default-inverted' && {
            backgroundColor: colors.gray['400'],
            borderColor: colors.gray['300'],
          },
        ]}>
        <Text
          style={[
            styles.textNormal,
            componentStyles.label,
            isInvertedColor && {
              color: LIGHT_FONT_COLOR,
            },
          ]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  floatingPosition: {
    position: 'absolute',
    right: spacing.m,
    bottom: spacing.m,
    zIndex: Z_INDEX,
  },
  label: {
    alignSelf: 'center',
    fontSize: 20,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: 100,
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
});

export default FloatingActionButton;
