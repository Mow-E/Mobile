import * as React from 'react';
import Svg, {SvgProps, Rect, Circle, Line, Path} from 'react-native-svg';
import {ColorValue} from 'react-native';
import IconProps from './IconProps';
import colors from '../../styles/colors';

/**
 * The (extended) properties for the camera icon.
 */
type SvgComponentProps = Omit<SvgProps, 'fill'> & {
  /**
   * The primary color of the icon, used for the main part of the camera.
   */
  primaryColor: ColorValue;
  /**
   * The secondary color of the icon, used for the lens section of the camera.
   */
  secondaryColor: ColorValue;
  /**
   * The color of the lens in the icon.
   */
  lensColor: ColorValue;
};

const SvgComponent = (props: SvgComponentProps) => (
  <Svg width={24} height={24} viewBox="0 0 88 57.878315" fill="none" {...props}>
    <Rect
      x={0.5}
      y={8.9748135}
      width={87}
      height={48.4035}
      fill={props.primaryColor}
      stroke={props.stroke}
    />
    <Circle
      cx={54.421101}
      cy={33.562572}
      r={15.3246}
      fill={props.secondaryColor}
      stroke={props.stroke}
    />
    <Circle
      cx={54.806999}
      cy={33.948772}
      r={11.8509}
      fill={props.lensColor}
      stroke={props.stroke}
    />
    <Line
      y1={20.325872}
      x2={46.3158}
      y2={20.325872}
      stroke={props.stroke}
      x1={0}
    />
    <Line
      y1={46.571472}
      x2={46.3158}
      y2={46.571472}
      stroke={props.stroke}
      x1={0}
    />
    <Line
      x1={62.526299}
      y1={46.571472}
      x2={88}
      y2={46.571472}
      stroke={props.stroke}
    />
    <Line
      x1={62.526299}
      y1={20.325872}
      x2={88}
      y2={20.325872}
      stroke={props.stroke}
    />
    <Path
      d="m 50.1754,0.75557355 -0.3779,0.43643995 -6.0166,6.94736 -0.7165,0.82733 H 70.0144 l -0.3779,-0.43643995 -6.0166,-6.94736 -0.7165,-0.82733 Z"
      fill={props.primaryColor}
    />
  </Svg>
);

/**
 * An icon that shows a camera.
 * Used as the main icon for the image history section(s).
 */
function CameraIcon({
  size = 24,
  colored = false,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const darkModeStrokeColor = colored ? colors.gray['50'] : colors.gray['450'];
  const strokeColor = darkModeInverted
    ? darkModeStrokeColor
    : colors.gray['950'];

  const primaryColoredFillColor = colors.primary.dark;
  const primaryGrayscaleFillColor = colors.gray['300'];
  const primaryFillColor = colored
    ? primaryColoredFillColor
    : primaryGrayscaleFillColor;

  const secondaryColoredFillColor = colors.primary.light;
  const secondaryGrayscaleFillColor = colors.gray['200'];
  const secondaryFillColor = colored
    ? secondaryColoredFillColor
    : secondaryGrayscaleFillColor;

  const lensColor =
    colored && darkModeInverted ? colors.gray['700'] : colors.gray['50'];

  return (
    <SvgComponent
      height={size}
      width={size}
      stroke={strokeColor}
      primaryColor={primaryFillColor}
      secondaryColor={secondaryFillColor}
      lensColor={lensColor}
      strokeWidth={size > 128 ? 128 / size : 24 / size}
    />
  );
}

export default CameraIcon;
