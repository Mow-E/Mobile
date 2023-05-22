import React from 'react';
import {render} from '@testing-library/react-native';
import ConnectingToMowerOverlay from '../../../src/components/mower-connections/ConnectingToMowerOverlay';

it('renders correctly', () => {
  const treeOne = render(<ConnectingToMowerOverlay visible />).toJSON();
  const treeTwo = render(<ConnectingToMowerOverlay />).toJSON();

  expect(treeOne).not.toEqual(treeTwo);
});
