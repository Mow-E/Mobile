import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import useStyles from '../hooks/useStyles';
import colors from '../styles/colors';
import {MowerConnectionsRoutes} from './navigation';
import MowerConnectionsListPage from './mower-connections/MowerConnectionsListPage';
import MowerConnectionDetailsPage from './mower-connections/MowerConnectionDetailsPage';

const Stack = createStackNavigator<MowerConnectionsRoutes>();

/**
 * Shows mower connections and options/details for them.
 * See `/src/pages/navigation.ts` for details on the sub-routes.
 */
function MowerConnectionsPage(): JSX.Element {
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="MowerConnectionsList"
      screenOptions={{
        headerStyle: styles.layoutHeaderStyle,
        headerTitleStyle: styles.layoutHeaderTitleStyle,
        headerTintColor: colors.secondary.light,
        cardStyle: styles.layoutSceneContainerStyle,
        headerBackTitle: t('layout.header.back')!,
        animationTypeForReplace: 'pop',
      }}>
      <Stack.Screen
        name="MowerConnectionsList"
        component={MowerConnectionsListPage}
        options={{
          title: t('routes.mowerConnections.mowerConnectionsList.headerTitle')!,
        }}
      />
      <Stack.Screen
        name="MowerConnectionDetails"
        component={MowerConnectionDetailsPage}
        options={({route}) => ({title: route.params.connection?.name})}
      />
    </Stack.Navigator>
  );
}

export default MowerConnectionsPage;
