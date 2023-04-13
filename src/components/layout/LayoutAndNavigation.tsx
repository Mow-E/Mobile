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

const Tab = createBottomTabNavigator();

const SHOW_TAB_BAR_LABELS: boolean = false;

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
  const createMapIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(({size, focused}) => <MapIcon size={size} colored={focused} />, []);

  const createMowerConnectionsIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(({size, focused}) => <MowEIcon size={size} colored={focused} />, []);

  const createSettingsIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(({size, focused}) => <CogsIcon size={size} colored={focused} />, []);

  const createImageHistoryIcon = useCallback<
    (props: TabBarIconFactoryProps) => JSX.Element
  >(({size, focused}) => <CameraIcon size={size} colored={focused} />, []);

  return (
    <Tab.Navigator initialRouteName="map">
      <Tab.Screen
        name="map"
        component={MapPage}
        options={{
          headerTitle: 'Mow-E',
          tabBarLabel: 'Map',
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createMapIcon,
        }}
      />
      <Tab.Screen
        name="mower-connections"
        component={MowerConnectionsPage}
        options={{
          headerTitle: 'Mower Connections',
          tabBarLabel: 'Mower',
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createMowerConnectionsIcon,
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsPage}
        options={{
          headerTitle: 'Settings',
          tabBarLabel: 'Settings',
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createSettingsIcon,
        }}
      />
      <Tab.Screen
        name="image-history"
        component={ImageHistoryPage}
        options={{
          headerTitle: 'Image History',
          tabBarLabel: 'Images',
          tabBarShowLabel: SHOW_TAB_BAR_LABELS,
          tabBarIcon: createImageHistoryIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default LayoutAndNavigation;
