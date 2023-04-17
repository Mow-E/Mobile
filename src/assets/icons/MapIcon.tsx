import * as React from 'react';
import Svg, {SvgProps, Line, Circle, Path} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 69.470993 67.297112"
      fill="none"
      {...props}>
      <Line
        y1={26.296127}
        x2={0.85401821}
        y2={67.291687}
        stroke={props.stroke}
        x1={1.3100156}
      />
      <Line
        y1={17.829628}
        x2={68.51503}
        y2={58.825188}
        stroke={props.stroke}
        x1={68.971024}
      />
      <Line
        y1={26.296127}
        x2={45.963028}
        y2={67.291687}
        stroke={props.stroke}
        x1={46.419025}
      />
      <Line
        y1={17.829628}
        x2={23.410929}
        y2={58.825188}
        stroke={props.stroke}
        x1={23.866926}
      />
      <Line
        y1={25.82403}
        x2={23.182575}
        y2={17.357529}
        stroke={props.stroke}
        strokeWidth={0.999984}
        x1={0.63054752}
      />
      <Line
        y1={17.356358}
        x2={46.090553}
        y2={25.822845}
        stroke={props.stroke}
        strokeWidth={0.999984}
        x1={23.087475}
      />
      <Line
        y1={26.273958}
        x2={68.869011}
        y2={17.80747}
        stroke={props.stroke}
        strokeWidth={0.999984}
        x1={45.865936}
      />
      <Line
        y1={66.819733}
        x2={22.731525}
        y2={58.35323}
        stroke={props.stroke}
        strokeWidth={0.999984}
        x1={0.1794975}
      />
      <Line
        y1={58.352058}
        x2={46.090553}
        y2={66.818542}
        stroke={props.stroke}
        strokeWidth={0.999984}
        x1={23.087475}
      />
      <Line
        y1={66.819733}
        x2={68.286682}
        y2={58.35323}
        stroke={props.stroke}
        strokeWidth={0.999984}
        x1={45.734657}
      />
      <Circle
        cx={34.412552}
        cy={14.1218}
        r={14.1218}
        fill={props.fill}
        stroke={props.fill}
      />
      <Path
        d="m 34.116455,42.4782 -13.6445,-24.5226 27.7313,0.2453 z"
        fill={props.fill}
        stroke={props.fill}
      />
    </Svg>
  );
}

/**
 * An icon that shows a map.
 * Used as the main icon for the map section(s).
 */
function MapIcon({
  size = 24,
  colored = false,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted
    ? colors.gray['300']
    : colors.gray['950'];
  const coloredFillColor = darkModeInverted
    ? colors.red.light
    : colors.red.dark;
  const grayscaleFillColor = darkModeInverted
    ? colors.gray['50']
    : colors.gray['300'];
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

export default MapIcon;
