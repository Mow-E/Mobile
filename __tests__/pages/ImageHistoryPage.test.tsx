import 'react-native';
import React from 'react';
import ImageHistoryPage from '../../src/pages/ImageHistoryPage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {mockApiService} from '../../jest/utils';

it('renders correctly', () => {
  mockApiService({});

  renderer.create(<ImageHistoryPage />);
});
