import 'react-native';
import React from 'react';
import App from '../src/App';
import * as useIsInDarkMode from '../src/hooks/useIsInDarkMode';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

it('renders correctly in dark mode', () => {
  jest.spyOn(useIsInDarkMode, 'default').mockImplementation(() => true);

  renderer.create(<App />);
});
