import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LayoutAndNavigation from './components/layout/LayoutAndNavigation';
import useIsInDarkMode from './hooks/useIsInDarkMode';
import './i18n.config';
import {
  ActiveMowerConnectionContext,
  MowerConnection,
} from './hooks/useActiveMowerConnection';

/**
 * The Mow-E Mobile app. Renders the complete application.
 */
function App(): JSX.Element {
  const [activeMowerConnection, setActiveMowerConnection] =
    useState<MowerConnection | null>(null);
  const isDarkMode = useIsInDarkMode();

  return (
    <NavigationContainer>
      <ActiveMowerConnectionContext.Provider
        value={{
          activeConnection: activeMowerConnection,
          setActiveConnection: setActiveMowerConnection,
        }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <LayoutAndNavigation />
      </ActiveMowerConnectionContext.Provider>
    </NavigationContainer>
  );
}

export default App;
