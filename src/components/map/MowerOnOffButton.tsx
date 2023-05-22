import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import FloatingActionButton from '../common/FloatingActionButton';
import useActiveMowerConnection from '../../hooks/useActiveMowerConnection';
import {StyleSheet, Text, View} from 'react-native';
import useStyles from '../../hooks/useStyles';
import spacing from '../../styles/spacing';

/**
 * The props for <MowerOnOffButton />.
 */
interface MowerOnOffButtonProps {
  /**
   * Called when the mower should be started/ be turned on.
   */
  onStartPress: () => Promise<void>;
  /**
   * Called when the mower should be stopped/ be turned off.
   */
  onStopPress: () => Promise<void>;
}

/**
 * Button singalling the current state of the mower (on/off) and a press should mean to change said state.
 */
function MowerOnOffButton({
  onStartPress,
  onStopPress,
}: MowerOnOffButtonProps): JSX.Element {
  const {activeConnection, setActiveConnection} = useActiveMowerConnection();
  const {t} = useTranslation();
  const styles = useStyles();

  const currentMowerState = activeConnection?.state ?? 'off';

  const handleMowerOnOffPress = useCallback(async () => {
    if (currentMowerState === 'on') {
      await onStopPress();

      if (activeConnection) {
        setActiveConnection({
          ...activeConnection,
          state: 'off',
        });
      }
    } else {
      await onStartPress();

      if (activeConnection) {
        setActiveConnection({
          ...activeConnection,
          state: 'on',
        });
      }
    }
  }, [
    currentMowerState,
    onStartPress,
    onStopPress,
    activeConnection,
    setActiveConnection,
  ]);

  const buttonLabel = useMemo<React.ReactElement>(() => {
    return (
      <View style={[styles.flexColumn, componentStyles.container]}>
        <Text
          style={[
            currentMowerState === 'on'
              ? styles.textNormalInverted
              : styles.textNormalBold,
            componentStyles.label,
          ]}>
          {t('routes.map.mowerOnOffButton.onLabel')}
        </Text>
        <View
          style={[
            currentMowerState === 'on'
              ? styles.borderTopInverted
              : styles.borderTop,
            componentStyles.divider,
          ]}
        />
        <Text
          style={[
            currentMowerState === 'off'
              ? styles.textNormal
              : styles.textNormalBoldInverted,
            componentStyles.label,
          ]}>
          {t('routes.map.mowerOnOffButton.offLabel')}
        </Text>
      </View>
    );
  }, [t, styles, currentMowerState]);

  return (
    <FloatingActionButton
      label={buttonLabel}
      onPress={handleMowerOnOffPress}
      color={currentMowerState === 'on' ? 'secondary-inverted' : 'secondary'}
    />
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  label: {alignSelf: 'center'},
  container: {
    justifyContent: 'center',
    gap: spacing.xs,
    width: '100%',
  },
  divider: {
    width: '65%',
    alignSelf: 'center',
  },
});

export default MowerOnOffButton;
