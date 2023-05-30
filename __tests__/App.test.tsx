import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {setToDarkMode} from '../jest/utils';
import {render, waitFor} from '@testing-library/react-native';

it('renders correctly', () => {
  // Wrap in waitFor to execute useEffect hooks safely while rendering
  waitFor(() => {
    render(<App />);
  });
});

it('renders correctly in dark mode', () => {
  setToDarkMode();

  waitFor(() => {
    renderer.create(<App />);
  });
});
