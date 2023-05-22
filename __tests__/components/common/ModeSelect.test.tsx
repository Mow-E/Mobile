import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import {fireEvent, render} from '@testing-library/react-native';
import ModeSelect from '../../../src/components/common/ModeSelect';
import {Text} from 'react-native';
import {setToDarkMode} from '../../../jest/utils';

it('renders correctly', () => {
  let mode = 'foo';

  const {getByTestId} = render(
    <ModeSelect
      activeMode={mode}
      setActiveMode={newMode => {
        mode = newMode;
      }}
      modes={[
        {
          name: 'foo',
          display: <Text testID="foo">'foo'</Text>,
        },
        {
          name: 'bar',
          display: <Text testID="bar">'bar'</Text>,
        },
      ]}
    />,
  );

  expect(getByTestId('foo')).toBeTruthy();
  expect(getByTestId('bar')).toBeTruthy();
});

it('renders correctly in dark mode', () => {
  setToDarkMode();

  let mode = 'foo';

  const {getByTestId} = render(
    <ModeSelect
      activeMode={mode}
      setActiveMode={newMode => {
        mode = newMode;
      }}
      modes={[
        {
          name: 'foo',
          display: <Text testID="foo">'foo'</Text>,
        },
        {
          name: 'bar',
          display: <Text testID="bar">'bar'</Text>,
        },
      ]}
    />,
  );

  expect(getByTestId('foo')).toBeTruthy();
  expect(getByTestId('bar')).toBeTruthy();
});

it('does not change when active mode is pressed', () => {
  let mode = 'foo';

  const {getByTestId} = render(
    <ModeSelect
      activeMode={mode}
      setActiveMode={newMode => {
        mode = newMode;
      }}
      modes={[
        {
          name: 'foo',
          display: <Text testID="foo">'foo'</Text>,
        },
        {
          name: 'bar',
          display: <Text testID="bar">'bar'</Text>,
        },
      ]}
    />,
  );

  expect(mode).toBe('foo');
  fireEvent(getByTestId('foo'), 'press');
  expect(mode).toBe('foo');
});

it('does change when inactive mode is pressed', () => {
  let mode = 'foo';

  const {getByTestId} = render(
    <ModeSelect
      activeMode={mode}
      setActiveMode={newMode => {
        mode = newMode;
      }}
      modes={[
        {
          name: 'foo',
          display: <Text testID="foo">'foo'</Text>,
        },
        {
          name: 'bar',
          display: <Text testID="bar">'bar'</Text>,
        },
      ]}
    />,
  );

  expect(mode).toBe('foo');
  fireEvent(getByTestId('bar'), 'press');
  expect(mode).toBe('bar');
});
