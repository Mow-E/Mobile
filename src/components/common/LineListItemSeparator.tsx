import React from 'react';
import {View} from 'react-native';
import useStyles from '../../hooks/useStyles';

/**
 * A simple line that can be used a separator component for lists like <FlatList />.
 */
function LineListItemSeparator(): JSX.Element {
  const styles = useStyles();

  return <View style={styles.borderTop} />;
}

export default LineListItemSeparator;
