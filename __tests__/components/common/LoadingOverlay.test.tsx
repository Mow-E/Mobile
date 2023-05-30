import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingOverlay from '../../../src/components/common/LoadingOverlay';

it('renders correctly', () => {
  const treeOne = render(<LoadingOverlay text="foo" visible />).toJSON();
  const treeTwo = render(<LoadingOverlay text="foo" />).toJSON();

  expect(treeOne).not.toEqual(treeTwo);
});
