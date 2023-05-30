import 'react-native';
import React from 'react';
import ArrowLeftIcon from '../../../src/assets/icons/ArrowLeftIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<ArrowLeftIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<ArrowLeftIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<ArrowLeftIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<ArrowLeftIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<ArrowLeftIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<ArrowLeftIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
