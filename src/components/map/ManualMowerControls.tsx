import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import ArrowDownIcon from '../../assets/icons/ArrowDownIcon';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon';
import ArrowUpIcon, {WIDTH_HEIGHT_RATIO} from '../../assets/icons/ArrowUpIcon';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import {Z_INDEX} from '../common/FloatingActionButton';

/** Length of the longer side of each arrow icon. */
const LONGER_ARROW_SIDE_SIZE = 64;
/** Length of the shorter side of each arrow icon. */
const SHORTER_ARROW_SIDE_SIZE = LONGER_ARROW_SIDE_SIZE * WIDTH_HEIGHT_RATIO;
/** Padding used for the general controls container. */
const PADDING = spacing.s;
/** Flex gap between the controls. */
const GAP = spacing.xs;

/** Possible direction a control can signal. */
export type ControlDirection = 'forward' | 'backward' | 'left' | 'right';

/**
 * The props for <ManualMowerControls />
 */
interface ManualMowerControlsProps {
  /**
   * Called when a control is started being pressed (often also called onPressIn).
   *
   * @param direction ControlDirection the direction of the control.
   */
  onControlPressStart: (direction: ControlDirection) => void;
  /**
   * Called when a control is stopped being pressed (often also called onPressOut).
   *
   * @param direction ControlDirection the direction of the control.
   */
  onControlPressStop: (direction: ControlDirection) => void;
}

/**
 * The manual movement controls for the active mower.
 * They are rendered in a sheet overlay that is fixed to the bottom of the screen content.
 */
function ManualMowerControls({
  onControlPressStart,
  onControlPressStop,
}: ManualMowerControlsProps): JSX.Element {
  const [activelyPressedControl, setActivelyPressedControl] =
    useState<ControlDirection | null>(null);

  const handleControlPressStart = useCallback<
    (direction: ControlDirection) => void
  >(
    direction => {
      setActivelyPressedControl(direction);
      onControlPressStart(direction);
    },
    [onControlPressStart],
  );

  const handleControlPressStop = useCallback<
    (direction: ControlDirection) => void
  >(
    direction => {
      setActivelyPressedControl(null);
      onControlPressStop(direction);
    },
    [onControlPressStop],
  );

  return (
    <View style={componentStyles.outerContainer}>
      <View style={componentStyles.innerContainer}>
        <View style={componentStyles.spacingLongerSide} />
        <Pressable
          onPressIn={() => handleControlPressStart('left')}
          onPressOut={() => handleControlPressStop('left')}>
          <ArrowLeftIcon
            size={LONGER_ARROW_SIDE_SIZE}
            lightColor={activelyPressedControl === 'left'}
          />
        </Pressable>
        <View style={componentStyles.spacingLongerSide} />
      </View>
      <View style={componentStyles.innerContainer}>
        <Pressable
          onPressIn={() => handleControlPressStart('forward')}
          onPressOut={() => handleControlPressStop('forward')}>
          <ArrowUpIcon
            size={LONGER_ARROW_SIDE_SIZE}
            lightColor={activelyPressedControl === 'forward'}
          />
        </Pressable>
        <View style={componentStyles.spacingShorterSide} />
        <Pressable
          onPressIn={() => handleControlPressStart('backward')}
          onPressOut={() => handleControlPressStop('backward')}>
          <ArrowDownIcon
            size={LONGER_ARROW_SIDE_SIZE}
            lightColor={activelyPressedControl === 'backward'}
          />
        </Pressable>
      </View>
      <View style={componentStyles.innerContainer}>
        <View style={componentStyles.spacingLongerSide} />
        <Pressable
          onPressIn={() => handleControlPressStart('right')}
          onPressOut={() => handleControlPressStop('right')}>
          <ArrowRightIcon
            size={LONGER_ARROW_SIDE_SIZE}
            lightColor={activelyPressedControl === 'right'}
          />
        </Pressable>
        <View style={componentStyles.spacingLongerSide} />
      </View>
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    // Make sure that a FAB would still be visible above this plane
    zIndex: Z_INDEX - 1,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.gray['300'] + colors.opacitySuffix['50%'],
    height:
      2 * LONGER_ARROW_SIDE_SIZE +
      SHORTER_ARROW_SIDE_SIZE +
      2 * GAP +
      2 * PADDING,
    paddingVertical: PADDING,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: GAP,
  },
  innerContainer: {flexDirection: 'column', gap: GAP},
  spacingLongerSide: {height: LONGER_ARROW_SIDE_SIZE},
  spacingShorterSide: {height: SHORTER_ARROW_SIDE_SIZE},
});

export default ManualMowerControls;
