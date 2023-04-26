import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import useStyles from '../../hooks/useStyles';
import {SettingsRoutes} from '../navigation';
import spacing from '../../styles/spacing';

function SettingsLanguagePage({}: StackScreenProps<
  SettingsRoutes,
  'SettingsLanguage'
>): JSX.Element {
  const styles = useStyles();

  return (
    <View
      style={[
        styles.flexColumn,
        {
          marginTop: spacing.xxl,
          marginHorizontal: spacing.l,
          gap: spacing.xl,
        },
      ]}
    />
  );
}

export default SettingsLanguagePage;
