import * as React from 'react';
import Svg, {SvgProps, Rect, Path, Circle, Line} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 79 59.25" fill="none" {...props}>
    <Path
      d="m 33.6481,12.4353 h 12.4352 v 7.3148 H 33.6481 Z"
      fill={colors.gray['300']}
      stroke={colors.gray['300']}
    />
    <Rect
      x={12.9352}
      y={20.25}
      width={53.861099}
      height={26.796301}
      fill={props.fill}
      stroke={props.stroke}
    />
    <Rect
      x={0.5}
      y={35.611099}
      width={26.796301}
      height={23.138901}
      fill={colors.gray['300']}
      stroke={props.stroke}
    />
    <Rect
      x={51.703701}
      y={35.611099}
      width={26.796301}
      height={23.138901}
      fill={colors.gray['300']}
      stroke={props.stroke}
    />
    <Path d="m 33.6481,12.4353 v 7.3148 Z" fill={colors.gray['300']} />
    <Path d="m 46.0833,12.4353 v 7.3148 Z" fill={colors.gray['300']} />
    <Rect
      x={23.1759}
      y={0.5}
      width={32.648102}
      height={11.4352}
      fill={colors.gray['300']}
      stroke={props.stroke}
    />
    <Circle
      cx={32.5509}
      cy={6.21769}
      r={3.0416701}
      fill={colors.gray['200']}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Circle
      cx={46.4491}
      cy={6.21769}
      r={3.0416701}
      fill={colors.gray['200']}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Circle
      cx={32.916698}
      cy={6.5833602}
      r={2.1944399}
      fill={colors.gray['950']}
    />
    <Circle
      cx={46.083302}
      cy={6.5833602}
      r={2.1944399}
      fill={colors.gray['950']}
    />
    <Line
      x1={2.1944399}
      y1={38.5186}
      x2={25.6019}
      y2={38.5186}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={53.398102}
      y1={38.5186}
      x2={76.805603}
      y2={38.5186}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={53.398102}
      y1={42.907501}
      x2={76.805603}
      y2={42.907501}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={53.398102}
      y1={47.296398}
      x2={76.805603}
      y2={47.296398}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={53.398102}
      y1={51.685299}
      x2={76.805603}
      y2={51.685299}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={53.398102}
      y1={56.074001}
      x2={76.805603}
      y2={56.074001}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={2.1944399}
      y1={51.685299}
      x2={25.6019}
      y2={51.685299}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={2.1944399}
      y1={56.074001}
      x2={25.6019}
      y2={56.074001}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={2.1944399}
      y1={42.907501}
      x2={25.6019}
      y2={42.907501}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
    <Line
      x1={2.1944399}
      y1={47.296398}
      x2={25.6019}
      y2={47.296398}
      stroke={props.stroke}
      strokeWidth={0.5}
    />
  </Svg>
);

/**
 * An icon that shows our robot mascot, Mow-E.
 * Used as the main icon for the mower connections section(s).
 */
function MowEIcon({
  size = 24,
  colored = false,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted
    ? colors.gray['700']
    : colors.gray['950'];
  const coloredFillColor = colors.primary.dark;
  const grayscaleFillColor = darkModeInverted
    ? colors.gray['400']
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

export default MowEIcon;
