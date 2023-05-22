import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

/** Ratio between width and height of this icon. See the svg viewBox for the numbers. */
export const WIDTH_HEIGHT_RATIO = 68 / 98;

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 68 98" fill="none" {...props}>
      <Rect
        x={17}
        y={29.772}
        width={34}
        height={67.2277}
        fill={props.fill}
        stroke={props.stroke}
      />
      <Path
        d="M 34 1 L 67 37 H 1 L 34 1 Z"
        fill={props.fill}
        stroke={props.stroke}
      />
    </Svg>
  );
}

/** Props for the manual arrow control icons. */
export type ArrowIconProps = IconProps & {
  /** Whether to show the icon in a lighter color, e.g. whilst pressed. */
  lightColor?: boolean;
};

/**
 * An icon that shows an upwards arrow icon.
 */
function ArrowUpIcon({
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

export default ArrowUpIcon;
