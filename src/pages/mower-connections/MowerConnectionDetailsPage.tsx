import React from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MowerConnectionsRoutes} from '../navigation';
import useStyles from '../../hooks/useStyles';
import spacing from '../../styles/spacing';

/**
 * Shows the details of a mower connection.
 * See `/src/pages/navigation.ts` for details on the props.
 */
function MowerConnectionDetailsPage({
  route: {
    params: {connection},
  },
}: StackScreenProps<
  MowerConnectionsRoutes,
  'MowerConnectionDetails'
>): JSX.Element {
  const styles = useStyles();

  return (
    <View
      style={[
        styles.flexColumn,
        {marginTop: spacing.xxl, marginHorizontal: spacing.l, gap: spacing.xl},
      ]}>
      <Text>{connection?.name}</Text>
    </View>
  );
}

export default MowerConnectionDetailsPage;
