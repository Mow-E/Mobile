import 'react-native';
import React from 'react';
import SettingsPage from '../../src/pages/SettingsPage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {NavigationContainer} from '@react-navigation/native';

it('renders correctly', () => {
  renderer.create(
    <NavigationContainer>
      <SettingsPage />
    </NavigationContainer>,
  );
});
