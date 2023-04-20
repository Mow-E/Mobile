import 'react-native';
import React from 'react';
import MowerConnectionsPage from '../../src/pages/MowerConnectionsPage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {NavigationContainer} from '@react-navigation/native';

it('renders correctly', () => {
  renderer.create(
    <NavigationContainer>
      <MowerConnectionsPage />
    </NavigationContainer>,
  );
});
