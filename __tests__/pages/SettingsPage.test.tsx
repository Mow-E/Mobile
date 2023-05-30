import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SettingsMainPage from '../../src/pages/settings/SettingsMainPage';

// Mock the navigation object
const mockNavigation = {
  navigate: jest.fn(),
};

describe('SettingsMainPage', () => {
  test('renders without error', () => {
    render(<SettingsMainPage navigation={mockNavigation} />);
  });

  test('displays the current mowing sessions to show in history', () => {
    const {getByText} = render(
      <SettingsMainPage navigation={mockNavigation} />,
    );
    const sessionsToShowText = getByText('latest session');
    expect(sessionsToShowText).toBeTruthy();
  });

  test('displays the current language', () => {
    const {getByText} = render(
      <SettingsMainPage navigation={mockNavigation} />,
    );
    const languageText = getByText('English');
    expect(languageText).toBeTruthy();
  });

  test('can select mowing sessions to show in history', () => {
    const {getByText} = render(
      <SettingsMainPage navigation={mockNavigation} />,
    );
    const sessionsToShowButton = getByText('latest session');
    fireEvent.press(sessionsToShowButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'SettingsMowingSessionsToShowInHistory',
    );
  });

  test('can select the language', () => {
    const {getByText} = render(
      <SettingsMainPage navigation={mockNavigation} />,
    );
    const languageButton = getByText('English');
    fireEvent.press(languageButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SettingsLanguage');
  });
});
