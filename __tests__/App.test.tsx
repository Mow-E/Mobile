import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {setToDarkMode} from '../jest/utils';

it('renders correctly', () => {
  renderer.create(<App />);
});

it('renders correctly in dark mode', () => {
  setToDarkMode();

  renderer.create(<App />);
});
