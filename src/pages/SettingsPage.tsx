import React from 'react';
import {useTranslation} from 'react-i18next';
import useStyles from '../hooks/useStyles';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsRoutes} from './navigation';
import colors from '../styles/colors';
import SettingsMainPage from './settings/SettingsMainPage';
import SettingsMowingSessionsToShowInHistoryPage from './settings/SettingsMowingSessionsToShowInHistoryPage';
import SettingsLanguagePage from './settings/SettingsLanguagePage';

const Stack = createStackNavigator<SettingsRoutes>();

/**
 * The page that lets the user customize general settings of the application.
 */
function SettingsPage(): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        headerStyle: styles.layoutHeaderStyle,
        headerTitleStyle: styles.layoutHeaderTitleStyle,
        headerTintColor: colors.secondary.light,
        cardStyle: styles.layoutSceneContainerStyle,
        headerBackTitle: t('layout.header.back')!,
        animationTypeForReplace: 'pop',
      }}>
      <Stack.Screen
        name="SettingsMain"
        component={SettingsMainPage}
        options={{
          title: t('routes.settings.settingsMain.headerTitle')!,
        }}
      />
      <Stack.Screen
        name="SettingsMowingSessionsToShowInHistory"
        component={SettingsMowingSessionsToShowInHistoryPage}
        options={{
          title: t(
            'routes.settings.settingsMowingSessionsToShowInHistory.heading',
          )!,
        }}
      />
      <Stack.Screen
        name="SettingsLanguage"
        component={SettingsLanguagePage}
        options={{
          title: t('routes.settings.settingsLanguage.heading')!,
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingsPage;
