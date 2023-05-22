import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import useStyles from '../../hooks/useStyles';
import colors from '../../styles/colors';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import spacing from '../../styles/spacing';
import {INFO_ICON_SIZE} from '../mower-connections/MowerConnectionInfoButton';

/**
 * The props for <Button />.
 */
interface ButtonProps {
  /**
   * The label to display inside the button.
   */
  label: string;
  /**
   * Called when the button is pressed.
   */
  onPress: () => void;
  /**
   * Whether the button should be rendered with full width (100%).
   */
  fullWidth?: boolean;
  /**
   * The color to display the button in.
   */
  color?: 'primary' | 'secondary' | 'default';
  /**
   * Optional test id for automated tests.
   */
  testID?: string;
}

/**
 * A pressable button.
 */
function Button({
  label,
  onPress,
  fullWidth = false,
  color = 'default',
  testID,
}: ButtonProps): JSX.Element {
  const styles = useStyles();
  const isInDarkMode = useIsInDarkMode();

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      style={[
        styles.border,
        componentStyles.container,
        fullWidth && componentStyles.containerFullWidth,
        color === 'primary' && {
          backgroundColor: isInDarkMode
            ? colors.primary.dark
            : colors.primary.light,
          borderColor: isInDarkMode
            ? colors.primary.dark
            : colors.primary.light,
        },
        color === 'secondary' && {
          backgroundColor: isInDarkMode
            ? colors.secondary.dark
            : colors.secondary.light,
          borderColor: isInDarkMode
            ? colors.secondary.dark
            : colors.secondary.light,
        },
        color === 'default' && {
          backgroundColor: isInDarkMode
            ? colors.gray['400']
            : colors.gray['300'],
          borderColor: isInDarkMode ? colors.gray['400'] : colors.gray['300'],
        },
      ]}>
      <Text
        style={[
          styles.textNormal,
          componentStyles.label,
          fullWidth && componentStyles.labelFullWidth,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  label: {
    padding: spacing.sm,
    paddingHorizontal: spacing.l,
  },
  labelFullWidth: {
    paddingHorizontal: spacing.sm,
  },
  container: {
    flexDirection: 'column',
    // This provides an even height for all list items, even if some have no info button
    // height = info + (2 * padding)
    height: INFO_ICON_SIZE + 2 * spacing.sm,
    width: 'auto',
    justifyContent: 'center',
  },
  containerFullWidth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Button;
