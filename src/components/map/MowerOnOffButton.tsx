import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import FloatingActionButton from '../common/FloatingActionButton';
import useActiveMowerConnection from '../../hooks/useActiveMowerConnection';

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

  return (
    <FloatingActionButton
      label={
        currentMowerState === 'on'
          ? t('routes.map.mowerOnOffButton.onLabel')!
          : t('routes.map.mowerOnOffButton.offLabel')!
      }
      onPress={handleMowerOnOffPress}
      color={currentMowerState === 'on' ? 'secondary' : 'secondary-inverted'}
    />
  );
}

export default MowerOnOffButton;
