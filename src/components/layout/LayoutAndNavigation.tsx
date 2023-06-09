import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapPage from '../../pages/MapPage';
import MapIcon from '../../assets/icons/MapIcon';
import MowerConnectionsPage from '../../pages/MowerConnectionsPage';
import MowEIcon from '../../assets/icons/MowEIcon';
import SettingsPage from '../../pages/SettingsPage';
import CogsIcon from '../../assets/icons/CogsIcon';
import ImageHistoryPage from '../../pages/ImageHistoryPage';
import CameraIcon from '../../assets/icons/CameraIcon';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import useStyles from '../../hooks/useStyles';
import {RootRoutes} from '../../pages/navigation';

/** Value to multiply the default icon size in the tab bar by. */
const ICON_SIZE_MODIFICATOR = 1.2;

const Tab = createBottomTabNavigator<RootRoutes>();

/**
 * Properties an icon in the bottom navigation bar can accept.
 */
interface TabBarIconFactoryProps {
  /**
   * The size of the icon (same for width and height).
   */
  size: number;
  /**
   * Whether the icon is in a focused state, e.g. the active route in the navigation.
   */
  focused: boolean;
}

/**
 * The whole layout of the application. This includes:
 * * the header of the screen,
 * * the content of each screen/page/route,
 * * and the navigation bar at the bottom (footer).
 */
function LayoutAndNavigation(): JSX.Element {
  const {t} = useTranslation();
  const isInDarkMode = useIsInDarkMode();
  const styles = useStyles();

  const createMapIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(
    ({size, focused}) => (
      <MapIcon
        size={size * ICON_SIZE_MODIFICATOR}
        colored={focused}
        darkModeInverted={isInDarkMode}
      />
    ),
    [isInDarkMode],
  );

  const createMowerConnectionsIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(
    ({size, focused}) => (
      <MowEIcon
        size={size * ICON_SIZE_MODIFICATOR}
        colored={focused}
        darkModeInverted={isInDarkMode}
      />
    ),
    [isInDarkMode],
  );

  const createSettingsIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(
    ({size, focused}) => (
      <CogsIcon
        size={size * ICON_SIZE_MODIFICATOR}
        colored={focused}
        darkModeInverted={isInDarkMode}
      />
    ),
    [isInDarkMode],
  );

  const createImageHistoryIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(
    ({size, focused}) => (
      <CameraIcon
        size={size * ICON_SIZE_MODIFICATOR}
        colored={focused}
        darkModeInverted={isInDarkMode}
      />
    ),
    [isInDarkMode],
  );

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: styles.layoutTabBarActiveTintColor.color,
        headerStyle: styles.layoutHeaderStyle,
        headerTitleStyle: styles.layoutHeaderTitleStyle,
        tabBarStyle: styles.layoutTabBarStyle,
      }}
      sceneContainerStyle={styles.layoutSceneContainerStyle}>
      <Tab.Screen
        name="Map"
        component={MapPage}
        options={{
          title: t('routes.map.headerTitle')!,
          tabBarLabel: t('routes.map.tabBarLabel')!,
          tabBarIcon: createMapIcon,
        }}
      />
      <Tab.Screen
        name="MowerConnections"
        component={MowerConnectionsPage}
        options={{
          tabBarLabel: t('routes.mowerConnections.tabBarLabel')!,
          tabBarIcon: createMowerConnectionsIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarLabel: t('routes.settings.tabBarLabel')!,
          tabBarIcon: createSettingsIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ImageHistory"
        component={ImageHistoryPage}
        options={{
          title: t('routes.imageHistory.headerTitle')!,
          tabBarLabel: t('routes.imageHistory.tabBarLabel')!,
          tabBarIcon: createImageHistoryIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default LayoutAndNavigation;
