import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from './components/layout/LayoutAndNavigation';
import useIsInDarkMode from './hooks/useIsInDarkMode';
import './i18n.config';

/**
 * The Mow-E Mobile app. Renders the complete application.
 */
function App(): JSX.Element {
  const isDarkMode = useIsInDarkMode();

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <LayoutAndNavigation />
    </NavigationContainer>
  );
}

export default App;
