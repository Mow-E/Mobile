import React, {PropsWithChildren, useEffect, useMemo} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

/**
 * The input range for the circular animation.
 */
const ANIMATION_INPUT_RANGE = [0, 1];

/**
 * The properties for <CircularAroundCenterAnimation />
 */
interface CircularAroundCenterAnimationProps {
  /**
   * The duration of the animation.
   */
  duration?: number;
  /**
   * The radius of the circle to move in.
   */
  radius?: number;
}

/**
 * Animates the children in a circular movement around a center point.
 */
function CircularAroundCenterAnimation({
  duration = 1_000,
  radius = 100,
  children,
}: PropsWithChildren<CircularAroundCenterAnimationProps>): JSX.Element {
  const animated = useMemo(() => new Animated.Value(0), []);

  // Based on https://stackoverflow.com/a/61891268
  // Rotate children by first rotating an outer container in one direction and then
  // perform an equivalent counter-rotation of an inner container in the other direction
  // to make it seem as if the children don't rotate
  const rotation = useMemo(
    () =>
      animated.interpolate({
        inputRange: ANIMATION_INPUT_RANGE,
        outputRange: ['0deg', '360deg'],
      }),
    [animated],
  );
  const counterRotation = useMemo(
    () =>
      animated.interpolate({
        inputRange: ANIMATION_INPUT_RANGE,
        outputRange: ['0deg', '-360deg'],
      }),
    [animated],
  );

  const timing = useMemo(
    () =>
      Animated.loop(
        Animated.timing(animated, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
    [animated, duration],
  );

  useEffect(() => {
    timing.start();

    return () => timing.reset();
  }, [timing, duration]);

  const animationStyles = useMemo(
    () => ({
      outerRotation: {
        transform: [{rotate: rotation}],
        height: radius * 2,
      },
      innerRotation: {
        transform: [{rotate: counterRotation}],
      },
    }),
    [rotation, counterRotation, radius],
  );

  return (
    <Animated.View
      style={[componentStyles.outerContainer, animationStyles.outerRotation]}>
      <Animated.View
        style={[componentStyles.innerContainer, animationStyles.innerRotation]}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
  },
  innerContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularAroundCenterAnimation;
