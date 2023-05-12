import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import useStyles from '../hooks/useStyles';
import {LoginRoutes} from './navigation';
import LoginMainPage from './login/LoginMainPage';
import {useTranslation} from 'react-i18next';
import colors from '../styles/colors';

const Stack = createStackNavigator<LoginRoutes>();

/**
 * The pages for user login and registration.
 */
function LoginPage(): JSX.Element {
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="LoginMain"
      screenOptions={{
        headerStyle: styles.layoutHeaderStyle,
        headerTitleStyle: styles.layoutHeaderTitleStyle,
        headerTintColor: colors.secondary.light,
        cardStyle: styles.layoutSceneContainerStyle,
        headerBackTitle: t('layout.header.back')!,
        animationTypeForReplace: 'pop',
      }}>
      <Stack.Screen
        name="LoginMain"
        component={LoginMainPage}
        options={{
          title: t('routes.login.loginMain.headerTitle')!,
        }}
      />
    </Stack.Navigator>
  );
}

export default LoginPage;
