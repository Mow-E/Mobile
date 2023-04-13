import {useColorScheme} from 'react-native';

/**
 * Checks whether the system's color scheme is set to 'dark mode'.
 */
function useIsInDarkMode(): boolean {
  return useColorScheme() === 'dark';
}

export default useIsInDarkMode;
