import 'react-native';
import React from 'react';
import CheckMarkIcon from '../../../src/assets/icons/CheckMarkIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<CheckMarkIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<CheckMarkIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<CheckMarkIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<CheckMarkIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<CheckMarkIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<CheckMarkIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
