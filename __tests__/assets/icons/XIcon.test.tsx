import 'react-native';
import React from 'react';
import XIcon from '../../../src/assets/icons/XIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<XIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<XIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<XIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<XIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<XIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<XIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
