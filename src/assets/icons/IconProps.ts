import {ColorValue} from 'react-native';

/**
 * The general properties all our icons have to accept.
 */
interface IconProps {
  /**
   * The size of the icon (same for width and height).
   */
  size?: number;
  /**
   * Whether the icon should be shown colored or in grayscale.
   */
  colored?: boolean | ColorValue;
  /**
   * Whether the icon should be shown as a dark-mode inverted version.
   */
  darkModeInverted?: boolean;
}

export default IconProps;
