import 'react-native';
import React from 'react';
import LightModeIcon from '../../../src/assets/icons/LightModeIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<LightModeIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<LightModeIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<LightModeIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<LightModeIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<LightModeIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<LightModeIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
