import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

/**
 * Gets the styles for the `<LayoutAndNavigation />` component,
 * based on whether the app is in dark mode.
 *
 * @param isInDarkMode whether the dark mode styles should be returned
 */
function getStyles(isInDarkMode?: boolean) {
  return StyleSheet.create({
    tabBarActiveTintColor: {
      color: isInDarkMode ? colors.secondary.light : colors.secondary.dark,
    },
    headerStyle: {
      backgroundColor: isInDarkMode ? colors.gray['700'] : colors.gray['50'],
    },
    headerTitleStyle: {
      color: isInDarkMode ? colors.gray['50'] : colors.gray['950'],
    },
    tabBarStyle: {
      backgroundColor: isInDarkMode ? colors.gray['700'] : colors.gray['50'],
    },
    sceneContainerStyle: {
      backgroundColor: isInDarkMode ? colors.gray['500'] : colors.gray['100'],
    },
  });
}

export default getStyles;
