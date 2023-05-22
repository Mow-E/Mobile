import 'react-native';
import React from 'react';
import AutomaticLightDarkModeIcon from '../../../src/assets/icons/AutomaticLightDarkModeIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<AutomaticLightDarkModeIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<AutomaticLightDarkModeIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer
    .create(<AutomaticLightDarkModeIcon colored={false} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in dark mode correctly', () => {
  const tree = renderer
    .create(<AutomaticLightDarkModeIcon darkModeInverted />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer
    .create(<AutomaticLightDarkModeIcon size={24} />)
    .toJSON();
  const treeLarge = renderer
    .create(<AutomaticLightDarkModeIcon size={48} />)
    .toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
