import 'react-native';
import React from 'react';
import ArrowUpIcon from '../../../src/assets/icons/ArrowUpIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<ArrowUpIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<ArrowUpIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<ArrowUpIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<ArrowUpIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<ArrowUpIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<ArrowUpIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
