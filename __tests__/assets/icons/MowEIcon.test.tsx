import 'react-native';
import React from 'react';
import MowEIcon from '../../../src/assets/icons/MowEIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<MowEIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<MowEIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<MowEIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<MowEIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<MowEIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
