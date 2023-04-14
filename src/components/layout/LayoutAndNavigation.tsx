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
import colors from '../../styles/colors';

const Tab = createBottomTabNavigator();

const SHOW_TAB_BAR_LABELS: boolean = true;

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

  const createMapIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(({size, focused}) => <MapIcon size={size * 1.2} colored={focused} />, []);

  const createMowerConnectionsIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(({size, focused}) => <MowEIcon size={size * 1.2} colored={focused} />, []);

  const createSettingsIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(({size, focused}) => <CogsIcon size={size * 1.2} colored={focused} />, []);

  const createImageHistoryIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(
    ({size, focused}) => <CameraIcon size={size * 1.2} colored={focused} />,
    [],
  );

  return (
    <Tab.Navigator initialRouteName="map">
      <Tab.Screen
        name="map"
        component={MapPage}
        options={{
          headerTitle: t('routes.map.headerTitle')!,
          tabBarLabel: t('routes.map.tabBarLabel')!,
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createMapIcon,
          tabBarActiveTintColor: colors.iconPurpleDark,
        }}
      />
      <Tab.Screen
        name="mower-connections"
        component={MowerConnectionsPage}
        options={{
          headerTitle: t('routes.mowerConnections.headerTitle')!,
          tabBarLabel: t('routes.mowerConnections.tabBarLabel')!,
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createMowerConnectionsIcon,
          tabBarActiveTintColor: colors.iconPurpleDark,
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsPage}
        options={{
          headerTitle: t('routes.settings.headerTitle')!,
          tabBarLabel: t('routes.settings.tabBarLabel')!,
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createSettingsIcon,
          tabBarActiveTintColor: colors.iconPurpleDark,
        }}
      />
      <Tab.Screen
        name="image-history"
        component={ImageHistoryPage}
        options={{
          headerTitle: t('routes.imageHistory.headerTitle')!,
          tabBarLabel: t('routes.imageHistory.tabBarLabel')!,
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createImageHistoryIcon,
          tabBarActiveTintColor: colors.iconPurpleDark,
        }}
      />
    </Tab.Navigator>
  );
}

export default LayoutAndNavigation;
