import 'react-native';
import React from 'react';
import InfoIcon from '../../../src/assets/icons/InfoIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<InfoIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<InfoIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<InfoIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<InfoIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<InfoIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<InfoIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
