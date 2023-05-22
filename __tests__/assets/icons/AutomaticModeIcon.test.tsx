import 'react-native';
import React from 'react';
import AutomaticModeIcon from '../../../src/assets/icons/AutomaticModeIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<AutomaticModeIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<AutomaticModeIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<AutomaticModeIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer.create(<AutomaticModeIcon darkModeInverted />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<AutomaticModeIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<AutomaticModeIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
