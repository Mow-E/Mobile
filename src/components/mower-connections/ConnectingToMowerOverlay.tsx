import React from 'react';
import {StyleSheet, Text} from 'react-native';
import CircularAroundCenterAnimation from '../animations/CircularAroundCenterAnimation';
import MowEIcon from '../../assets/icons/MowEIcon';
import Backdrop from '../common/Backdrop';
import {useTranslation} from 'react-i18next';
import useStyles from '../../hooks/useStyles';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';

/**
 * The size of the mow-e icon.
 */
const ICON_SIZE = 48;

/**
 * The properties of <ConnectingToMowerOverlay />.
 */
interface ConnectingToMowerOverlayProps {
  /**
   * Whether the overlay is visible.
   */
  visible?: boolean;
}

/**
 * Shows an overlay with an animated mow-e icon and a label signalling that a mower-connection is in the
 * process of connecting.
 */
function ConnectingToMowerOverlay({
  visible = false,
}: ConnectingToMowerOverlayProps): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();
  const isInDarkMode = useIsInDarkMode();

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
          <Text style={[styles.textNormal, componentStyles.absolutePosition]}>
            {t(
              'routes.mowerConnections.mowerConnectionsList.availableConnections.connectingLabel',
            )}
          </Text>
        </Backdrop>
      )}
    </>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  absolutePosition: {position: 'absolute'},
});

export default ConnectingToMowerOverlay;
