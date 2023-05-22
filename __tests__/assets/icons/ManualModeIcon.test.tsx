import 'react-native';
import React from 'react';
import ManualModeIcon from '../../../src/assets/icons/ManualModeIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<ManualModeIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<ManualModeIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<ManualModeIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<ManualModeIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<ManualModeIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<ManualModeIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
