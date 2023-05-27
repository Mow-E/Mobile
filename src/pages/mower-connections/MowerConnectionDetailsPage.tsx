import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MowerConnectionsRoutes} from '../navigation';
import useStyles from '../../hooks/useStyles';
import spacing from '../../styles/spacing';
import SectionWithHeading from '../../components/common/SectionWithHeading';
import {useTranslation} from 'react-i18next';
import LineListItemSeparator from '../../components/common/LineListItemSeparator';
import {INFO_ICON_SIZE} from '../../components/mower-connections/MowerConnectionInfoButton';
import useActiveMowerConnection from '../../hooks/useActiveMowerConnection';
import useBluetoothService from '../../hooks/useBluetoothService';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import useErrorState from '../../hooks/useErrorState';
import LoadingOverlay from '../../components/common/LoadingOverlay';

/**
 * Shows the details of a mower connection.
 * See `/src/pages/navigation.ts` for details on the props.
 */
function MowerConnectionDetailsPage({
  route: {
    params: {connection},
  },
  navigation,
}: StackScreenProps<
  MowerConnectionsRoutes,
  'MowerConnectionDetails'
>): JSX.Element {
  const [disconnecting, setDisconnecting] = useState<boolean>(false);
  const {activeConnection} = useActiveMowerConnection();
  const {setErrorState} = useErrorState();
  const styles = useStyles();
  const {t} = useTranslation();
  const bluetoothService = useBluetoothService();

  const informationItems = useMemo(
    () => [
      {
        label: t(
          'routes.mowerConnections.mowerConnectionDetails.information.serialNumber',
        )!,
        value: connection?.mowerInfos?.serialNumber,
      },
      {
        label: t(
          'routes.mowerConnections.mowerConnectionDetails.information.modelName',
        )!,
        value: connection?.mowerInfos?.modelName,
      },
      {
        label: t(
          'routes.mowerConnections.mowerConnectionDetails.information.modelNumber',
        )!,
        value: connection?.mowerInfos?.modelNumber,
      },
    ],
    [t, connection],
  );

  const handleDisconnectPress = useCallback(async () => {
    try {
      setDisconnecting(true);
      await bluetoothService.disconnect();
    } catch (e) {
      console.error(e);

      if (e instanceof Error) {
        setErrorState(e.message);
      } else if (typeof e === 'string') {
        setErrorState(e);
      }
    } finally {
      setDisconnecting(false);
      navigation.goBack();
    }
  }, [bluetoothService, setErrorState, navigation]);

  if (activeConnection?.id !== connection?.id) {
    return (
      <LoadingOverlay
        text={
          t(
            'routes.mowerConnections.mowerConnectionDetails.deleteMower.disconnectingLabel',
          )!
        }
        visible={disconnecting}
      />
    );
  }

  return (
    <>
      <LoadingOverlay
        text={
          t(
            'routes.mowerConnections.mowerConnectionDetails.deleteMower.disconnectingLabel',
          )!
        }
        visible={disconnecting}
      />
      <View
        style={[
          styles.flexColumn,
          {
            marginTop: spacing.xxl,
            marginHorizontal: spacing.l,
            gap: spacing.xl,
          },
        ]}>
        <Button
          label={
            t(
              'routes.mowerConnections.mowerConnectionDetails.deleteMower.buttonLabel',
            )!
          }
          onPress={handleDisconnectPress}
          fullWidth
          testID="disconnectActiveMowerButton"
        />
        <SectionWithHeading
          heading={
            t(
              'routes.mowerConnections.mowerConnectionDetails.password.heading',
            )!
          }>
          <TextInput
            value={connection?.id ?? connection?.password ?? ''}
            onChange={() => {}}
            placeholder={
              t(
                'routes.mowerConnections.mowerConnectionDetails.password.inputPlaceholder',
              )!
            }
            passwordField
            readonly
          />
        </SectionWithHeading>
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
    </>
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
  button: {
    justifyContent: 'center',
    padding: spacing.sm,
    textAlign: 'center',
  },
});

export default MowerConnectionDetailsPage;
