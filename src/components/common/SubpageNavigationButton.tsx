import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import spacing from '../../styles/spacing';
import {INFO_ICON_SIZE} from '../mower-connections/MowerConnectionInfoButton';
import ArrowForwardIcon from '../../assets/icons/ArrowForwardIcon';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';

/**
 * The properties for <SubpageNavigationButton />.
 */
interface SubpageNavigationButtonProps {
  /**
   * The item to display.
   */
  item: JSX.Element;
  /**
   * Called when the item is selected.
   */
  onSelectItem?: () => void;
}

/**
 * A list entry for a mower connection with an info button.
 */
function SubpageNavigationButton({
  item,
  onSelectItem,
}: SubpageNavigationButtonProps): JSX.Element {
  const isInDarkMode = useIsInDarkMode();
  return (
    <View style={componentStyles.container}>
      <Pressable onPress={onSelectItem} style={componentStyles.label}>
        {item}
      </Pressable>
      <View style={componentStyles.button}>
        <ArrowForwardIcon
          size={INFO_ICON_SIZE}
          darkModeInverted={isInDarkMode}
        />
      </View>
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // This provides an even height for all list items, even if some have no info button
    // height = info + (2 * padding)
    height: INFO_ICON_SIZE + 2 * spacing.sm,
  },
  label: {
    padding: spacing.sm,
    flexGrow: 1,
  },
  button: {
    justifyContent: 'center',
    padding: spacing.sm,
  },
});

export default SubpageNavigationButton;
