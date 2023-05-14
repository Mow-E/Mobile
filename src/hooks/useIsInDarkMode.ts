import {useColorScheme} from 'react-native';
import useAppColorMode from './useAppColorMode';

/**
 * Checks whether the system's color scheme is set to 'dark mode'.
 */
function useIsInDarkMode(): boolean {
  const systemColorScheme = useColorScheme();
  const {appColorMode} = useAppColorMode();

  if (appColorMode === 'auto') {
    return systemColorScheme === 'dark';
  }

  return appColorMode === 'dark';
}

export default useIsInDarkMode;
