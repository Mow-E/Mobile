import * as React from 'react';
import Svg, {SvgProps, Path, Circle, Line} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 40 39" fill="none" {...props}>
      <Circle
        cx={20.5}
        cy={19.5}
        r={8}
        fill={colors.gray['50']}
        stroke={props.stroke}
      />
      <Line x1={20.5} y1={10} x2={20.5} stroke={props.stroke} />
      <Line x1={20.5} y1={39} x2={20.5} y2={29} stroke={props.stroke} />
      <Line x1={30} y1={20.5} x2={40} y2={20.5} stroke={props.stroke} />
      <Line
        x1={27.3796}
        y1={27.6746}
        x2={33.8875}
        y2={35.2672}
        stroke={props.stroke}
      />
      <Line
        x1={35.3536}
        y1={5.35355}
        x2={28.3536}
        y2={12.3536}
        stroke={props.stroke}
      />
      <Path d="M12.5 27.5L5.5 34.5" stroke={props.stroke} />
      <Line
        x1={6.37963}
        y1={4.6746}
        x2={12.8875}
        y2={12.2672}
        stroke={props.stroke}
      />
      <Line y1={20.5} x2={10} y2={20.5} stroke={props.stroke} />
    </Svg>
  );
}

/**
 * An icon for the light app mode.
 */
function LightModeIcon({
  size = 24,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted ? colors.gray['50'] : colors.gray['950'];

  return <SvgComponent height={size} width={size} stroke={strokeColor} />;
}

export default LightModeIcon;
