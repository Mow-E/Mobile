import 'react-native';
import React from 'react';
import CameraIcon from '../../../src/assets/icons/CameraIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders default correctly', () => {
  const tree = renderer.create(<CameraIcon />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders colored correctly', () => {
  const tree = renderer.create(<CameraIcon colored />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders uncolored correctly', () => {
  const tree = renderer.create(<CameraIcon colored={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders in different sizes', () => {
  const treeSmall = renderer.create(<CameraIcon size={24} />).toJSON();
  const treeLarge = renderer.create(<CameraIcon size={48} />).toJSON();

  expect(treeSmall).not.toEqual(treeLarge);
});
