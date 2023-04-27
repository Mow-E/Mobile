import 'react-native';
import React from 'react';
import EyeOffIcon from '../../../src/assets/icons/EyeOffIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<EyeOffIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<EyeOffIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<EyeOffIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<EyeOffIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<EyeOffIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<EyeOffIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
