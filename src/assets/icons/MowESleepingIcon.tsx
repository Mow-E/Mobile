import * as React from 'react';
import {ColorValue} from 'react-native';
import Svg, {SvgProps, Rect, Path, Circle, Line} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

type SvgComponentProps = SvgProps & {
  sleepingZsColor: ColorValue;
};

const SvgComponent = (props: SvgComponentProps) => (
  <Svg width={24} height={24} viewBox="0 0 344 373" fill="none" {...props}>
    <Path
      d="M254.955 124V121.955L264.864 109.227V109.045H255.273V106.545H268.318V108.682L258.682 121.318V121.5H268.636V124H254.955Z"
      fill={props.sleepingZsColor}
      stroke={props.sleepingZsColor}
    />
    <Path
      d="M278.955 96V93.9545L288.864 81.2273V81.0455H279.273V78.5455H292.318V80.6818L282.682 93.3182V93.5H292.636V96H278.955Z"
      fill={props.sleepingZsColor}
      stroke={props.sleepingZsColor}
    />
    <Path
      d="M309.955 72V69.9545L319.864 57.2273V57.0455H310.273V54.5455H323.318V56.6818L313.682 69.3182V69.5H323.636V72H309.955Z"
      fill={props.sleepingZsColor}
      stroke={props.sleepingZsColor}
    />
    <Path
      d="M314.955 31V28.9545L324.864 16.2273V16.0455H315.273V13.5455H328.318V15.6818L318.682 28.3182V28.5H328.636V31H314.955Z"
      fill={props.sleepingZsColor}
      stroke={props.sleepingZsColor}
    />
    <Rect
      x={50.3982}
      y={214.75}
      width={219.139}
      height={110.537}
      fill={props.fill}
      stroke={props.stroke}
    />
    <Rect
      x={0.5}
      y={276.389}
      width={110.537}
      height={95.8611}
      fill={colors.gray['300']}
      stroke={props.stroke}
    />
    <Rect
      x={205.963}
      y={276.389}
      width={110.537}
      height={95.8611}
      fill={colors.gray['300']}
      stroke={props.stroke}
    />
    <Path
      d="M135.019 184.898H184.917V214.25H135.019V184.898Z"
      fill={colors.gray['300']}
      stroke="none"
    />
    <Line
      x1={135.019}
      y1={184.898}
      x2={135.019}
      y2={214.25}
      stroke={props.stroke}
    />
    <Line
      x1={184.917}
      y1={184.898}
      x2={184.917}
      y2={214.25}
      stroke={props.stroke}
    />
    <Rect
      x={91.4907}
      y={135.5}
      width={134.019}
      height={48.8982}
      fill={colors.gray['300']}
      stroke={props.stroke}
    />
    <Circle
      cx={130.616}
      cy={159.949}
      r={12.9583}
      fill={colors.gray['300']}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Circle
      cx={186.384}
      cy={159.949}
      r={12.9583}
      fill={colors.gray['300']}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={8.80566}
      y1={290.315}
      x2={102.732}
      y2={290.315}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={214.269}
      y1={290.315}
      x2={308.194}
      y2={290.315}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={214.269}
      y1={307.926}
      x2={308.194}
      y2={307.926}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={214.269}
      y1={325.537}
      x2={308.194}
      y2={325.537}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={214.269}
      y1={343.148}
      x2={308.194}
      y2={343.148}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={214.269}
      y1={360.759}
      x2={308.194}
      y2={360.759}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={8.80566}
      y1={343.148}
      x2={102.732}
      y2={343.148}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={8.80566}
      y1={360.759}
      x2={102.732}
      y2={360.759}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={8.80566}
      y1={307.926}
      x2={102.732}
      y2={307.926}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={8.80566}
      y1={325.537}
      x2={102.732}
      y2={325.537}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
  </Svg>
);

/**
 * An icon that shows our robot mascot, Mow-E, in a sleeping state.
 * Used e.g. when no mower is connected
 */
function MowESleepingIcon({
  size = 24,
  colored = false,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted
    ? colors.gray['700']
    : colors.gray['950'];
  const coloredFillColor = colors.primary.dark;
  const grayscaleFillColor = colors.gray['400'];
  const fillColor = colored ? coloredFillColor : grayscaleFillColor;
  const sleepingZsColor = darkModeInverted
    ? colors.gray['50']
    : colors.gray['950'];

  return (
    <SvgComponent
      height={size}
      width={size}
      stroke={strokeColor}
      fill={fillColor}
      sleepingZsColor={sleepingZsColor}
    />
  );
}

export default MowESleepingIcon;
