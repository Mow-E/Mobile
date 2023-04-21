import React from 'react';
import {Pressable} from 'react-native';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import InfoIcon from '../../assets/icons/InfoIcon';

/**
 * The (for now) fixed size of the info icon.
 */
export const INFO_ICON_SIZE = 24;

/**
 * The properties of <MowerConnectionInfoButton />.
 */
interface MowerConnectionInfoButtonProps {
  /**
   * Called when the button is pressed.
   */
  onOpenInfo?: () => void;
  testID?: string;
}

/**
 * Shows a button to signal that mower connection information will be shown when pressed.
 */
function MowerConnectionInfoButton({
  onOpenInfo,
  testID,
}: MowerConnectionInfoButtonProps): JSX.Element {
  const isInDarkMode = useIsInDarkMode();

  return (
    <Pressable onPress={onOpenInfo} testID={testID}>
      <InfoIcon size={INFO_ICON_SIZE} darkModeInverted={isInDarkMode} />
    </Pressable>
  );
}

export default MowerConnectionInfoButton;
