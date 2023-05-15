import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';
import colors from '../../styles/colors';
import {ArrowIconProps, WIDTH_HEIGHT_RATIO} from './ArrowUpIcon';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 98 68" fill="none" {...props}>
      <Rect
        x={29.772}
        y={17}
        width={67.2277}
        height={34}
        fill={props.fill}
        stroke={props.stroke}
      />
      <Path
        d="M 1 34 L 37 67 V 1 L 1 34 Z"
        fill={props.fill}
        stroke={props.stroke}
      />
    </Svg>
  );
}

/**
 * An icon that shows an leftwards arrow icon.
 */
function ArrowLeftIcon({
  size = 24,
  lightColor = false,
}: ArrowIconProps): JSX.Element {
  const strokeColor = lightColor
    ? colors.secondary.light
    : colors.secondary.dark;

  return (
    <SvgComponent
      height={size * WIDTH_HEIGHT_RATIO}
      width={size}
      stroke={strokeColor}
      fill={strokeColor}
    />
  );
}

export default ArrowLeftIcon;
