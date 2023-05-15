import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';
import colors from '../../styles/colors';
import {ArrowIconProps, WIDTH_HEIGHT_RATIO} from './ArrowUpIcon';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 68 98" fill="none" {...props}>
      <Rect
        x={17}
        y={0}
        width={34}
        height={67.2277}
        fill={props.fill}
        stroke={props.stroke}
      />
      <Path
        d="M 34 97 L 67 61 H 1 L 34 97 Z"
        fill={props.fill}
        stroke={props.stroke}
      />
    </Svg>
  );
}

/**
 * An icon that shows an downwards arrow icon.
 */
function ArrowDownIcon({
  size = 24,
  lightColor = false,
}: ArrowIconProps): JSX.Element {
  const strokeColor = lightColor
    ? colors.secondary.light
    : colors.secondary.dark;

  return (
    <SvgComponent
      height={size}
      width={size * WIDTH_HEIGHT_RATIO}
      stroke={strokeColor}
      fill={strokeColor}
    />
  );
}

export default ArrowDownIcon;
