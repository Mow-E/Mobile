import 'react-native';
import React from 'react';
import DarkModeIcon from '../../../src/assets/icons/DarkModeIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<DarkModeIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<DarkModeIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<DarkModeIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<DarkModeIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<DarkModeIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<DarkModeIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
