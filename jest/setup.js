/*
 * Based on https://reactnavigation.org/docs/testing#mocking-native-modules
 */

// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// eslint-disable-next-line no-undef
jest.useFakeTimers();

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
// eslint-disable-next-line no-undef
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// So that tests execute without warnings that don't load `App.tsx`
import '../src/i18n.config';
