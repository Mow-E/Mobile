import React from 'react';
import {StatusBar as DeviceStatusBar} from 'react-native';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';

/**
 * Wrapper for the system status bar that sets the color mode according to the app settings.
 */
function StatusBar(): JSX.Element {
  const isDarkMode = useIsInDarkMode();

  return (
    <DeviceStatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  );
}

export default StatusBar;
