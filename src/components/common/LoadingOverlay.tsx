import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CircularAroundCenterAnimation from '../animations/CircularAroundCenterAnimation';
import MowEIcon from '../../assets/icons/MowEIcon';
import Backdrop from '../common/Backdrop';
import useStyles from '../../hooks/useStyles';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import Button from './Button';
import {useTranslation} from 'react-i18next';
import spacing from '../../styles/spacing';

/**
 * The size of the mow-e icon.
 */
const ICON_SIZE = 48;

/**
 * The properties of <LoadingOverlay />.
 */
interface LoadingOverlayProps {
  /**
   * The text/label shown in the overlay.
   */
  text: string;
  /**
   * Whether the overlay is visible.
   */
  visible?: boolean;
  /**
   * Called when the overlay should be closed.
   */
  onClose?: () => void;
}

/**
 * Shows an overlay with an animated mow-e icon and a label.
 */
function LoadingOverlay({
  text,
  visible = false,
  onClose,
}: LoadingOverlayProps): JSX.Element {
  const styles = useStyles();
  const isInDarkMode = useIsInDarkMode();
  const {t} = useTranslation();

  return (
    <>
      {visible && (
        <Backdrop>
          <CircularAroundCenterAnimation
            duration={4_000}
            radius={100 + ICON_SIZE / 2}>
            <MowEIcon
              colored
              size={ICON_SIZE}
              darkModeInverted={isInDarkMode}
            />
          </CircularAroundCenterAnimation>
          <Text style={[styles.textHeading, componentStyles.label]}>
            {text}
          </Text>
          {onClose && (
            <View style={componentStyles.cancelButton}>
              <Button
                label={t('button.cancel')}
                onPress={onClose}
                color="secondary"
              />
            </View>
          )}
        </Backdrop>
      )}
    </>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  label: {position: 'absolute'},
  cancelButton: {
    position: 'absolute',
    left: spacing.l,
    bottom: spacing.l,
  },
});

export default LoadingOverlay;
