import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import CircularAroundCenterAnimation from '../../../src/components/animations/CircularAroundCenterAnimation';

it('renders correctly', () => {
  const treeOne = render(
    <CircularAroundCenterAnimation>
      <Text>foo</Text>
    </CircularAroundCenterAnimation>,
  ).toJSON();
  const treeTwo = render(
    <CircularAroundCenterAnimation radius={300}>
      <Text>foo</Text>
    </CircularAroundCenterAnimation>,
  ).toJSON();

  expect(treeOne).not.toEqual(treeTwo);
});
