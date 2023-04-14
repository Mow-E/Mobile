import 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from '../../../src/components/layout/LayoutAndNavigation';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(
    <NavigationContainer>
      <LayoutAndNavigation />
    </NavigationContainer>,
  );
});
