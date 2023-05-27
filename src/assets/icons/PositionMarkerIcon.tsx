import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 34 41" fill="none" {...props}>
    <Path
      d="M 34 1 L 25 39 L 18 25 L 0 22 L 34 1 Z"
      fill={props.fill}
      stroke={props.stroke}
    />
  </Svg>
);

/**
 * An icon that shows a general position marker.
 */
function PositionMarkerIcon({
  size = 24,
  colored = false,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted
    ? colors.gray['700']
    : colors.gray['950'];
  const coloredFillColor = darkModeInverted
    ? colors.red.light
    : colors.red.dark;
  const grayscaleFillColor = colors.gray['400'];
  const fillColor = colored ? coloredFillColor : grayscaleFillColor;

  return (
    <SvgComponent
      height={size}
      width={size}
      stroke={strokeColor}
      fill={fillColor}
    />
  );
}

export default PositionMarkerIcon;
