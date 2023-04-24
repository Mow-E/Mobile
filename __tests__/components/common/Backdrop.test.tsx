import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';
import Backdrop from '../../../src/components/common/Backdrop';
import {Text} from 'react-native';
import {setToDarkMode} from '../../../jest/utils';

it('renders correctly', () => {
  const {getByText} = render(
    <Backdrop>
      <Text>foo</Text>
    </Backdrop>,
  );

  expect(getByText('foo')).toBeTruthy();
});

it('renders correctly in dark mode', () => {
  setToDarkMode();

  const {getByText} = render(
    <Backdrop>
      <Text>foo</Text>
    </Backdrop>,
  );

  expect(getByText('foo')).toBeTruthy();
});
