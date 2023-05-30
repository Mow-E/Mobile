import 'react-native';
import React from 'react';
import ArrowDownIcon from '../../../src/assets/icons/ArrowDownIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<ArrowDownIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<ArrowDownIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<ArrowDownIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<ArrowDownIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<ArrowDownIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<ArrowDownIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
