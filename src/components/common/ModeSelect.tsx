import React, {Key, useCallback} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import spacing from '../../styles/spacing';
import colors from '../../styles/colors';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';

/**
 * An item to be displayed in the selection.
 */
interface ModeSelectItem<TMode extends Key> {
  /**
   * The unique name of the mode/item (not for display).
   */
  name: TMode;
  /**
   * The actual item to display, e.g. a label or an icon.
   */
  display: string | JSX.Element;
}

/**
 * The properties for <ModeSelect />.
 */
interface ModeSelectProps<TMode extends Key> {
  /**
   * The currently active/selected mode.
   */
  activeMode: TMode;
  /**
   * Called when another mode is selected.
   *
   * @param mode the new 'active' mode.
   */
  setActiveMode: (mode: TMode) => void;
  /**
   * The available mode items to display in the selection.
   */
  modes: ModeSelectItem<TMode>[];
}

function ModeSelect<TMode extends Key>({
  activeMode,
  setActiveMode,
  modes,
}: ModeSelectProps<TMode>): JSX.Element {
  const isInDarkMode = useIsInDarkMode();

  const handleModeButtonPress = useCallback<(name: TMode) => void>(
    name => {
      if (name !== activeMode) {
        setActiveMode(name);
      }
    },
    [activeMode, setActiveMode],
  );

  return (
    <View
      style={[
        styles.container,
        isInDarkMode
          ? styles.containerDarkModeBackground
          : styles.containerLightModeBackground,
      ]}>
      {modes.map(({name, display}) => (
        <Pressable
          onPress={() => handleModeButtonPress(name)}
          key={name}
          style={[
            styles.modeButton,
            activeMode === name && styles.activeModeButtonBackground,
          ]}>
          {display}
        </Pressable>
      ))}
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: spacing.xs,
    gap: spacing.xs,
  },
  containerLightModeBackground: {
    backgroundColor: colors.gray['50'],
  },
  containerDarkModeBackground: {
    backgroundColor: colors.gray['700'],
  },
  modeButton: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
  },
  activeModeButtonBackground: {
    backgroundColor: colors.secondary.light,
  },
});

export default ModeSelect;
