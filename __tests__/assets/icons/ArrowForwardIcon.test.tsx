import 'react-native';
import React from 'react';
import ArrowForwardIcon from '../../../src/assets/icons/ArrowForwardIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<ArrowForwardIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<ArrowForwardIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<ArrowForwardIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<ArrowForwardIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<ArrowForwardIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<ArrowForwardIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
