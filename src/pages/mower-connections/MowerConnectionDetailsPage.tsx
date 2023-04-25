import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MowerConnectionsRoutes} from '../navigation';
import useStyles from '../../hooks/useStyles';
import spacing from '../../styles/spacing';
import SectionWithHeading from '../../components/common/SectionWithHeading';
import {useTranslation} from 'react-i18next';
import LineListItemSeparator from '../../components/common/LineListItemSeparator';
import {INFO_ICON_SIZE} from '../../components/mower-connections/MowerConnectionInfoButton';

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
  const {t} = useTranslation();

  const informationItems = useMemo(
    () => [
      {
        label: t(
          'routes.mowerConnections.mowerConnectionDetails.information.serialNumber',
        )!,
        value: connection?.serialNumber,
      },
      {
        label: t(
          'routes.mowerConnections.mowerConnectionDetails.information.modelName',
        )!,
        value: connection?.modelName,
      },
      {
        label: t(
          'routes.mowerConnections.mowerConnectionDetails.information.modelNumber',
        )!,
        value: connection?.modelNumber,
      },
    ],
    [t, connection],
  );

  return (
    <View
      style={[
        styles.flexColumn,
        {marginTop: spacing.xxl, marginHorizontal: spacing.l, gap: spacing.xl},
      ]}>
      <SectionWithHeading
        heading={
          t(
            'routes.mowerConnections.mowerConnectionDetails.information.heading',
          )!
        }>
        <FlatList
          data={informationItems}
          contentContainerStyle={styles.border}
          ItemSeparatorComponent={LineListItemSeparator}
          renderItem={({item}) => (
            <View style={componentStyles.container}>
              <Text style={[styles.textNormal, componentStyles.label]}>
                {item.label}
              </Text>
              <Text style={[styles.textNormal, componentStyles.value]}>
                {item.value}
              </Text>
            </View>
          )}
        />
      </SectionWithHeading>
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // This provides an even height for all list items, even if some have no info button
    // height = info + (2 * padding)
    height: INFO_ICON_SIZE + 2 * spacing.sm,
  },
  label: {
    padding: spacing.sm,
    flexGrow: 1,
  },
  value: {
    padding: spacing.sm,
  },
});

export default MowerConnectionDetailsPage;
