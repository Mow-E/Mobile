import * as React from 'react';
import Svg, {SvgProps, Path, Circle, Mask, Line} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 40 39" fill="none" {...props}>
      <Circle
        cx={20.5}
        cy={19.5}
        r={8}
        transform="rotate(-90 20.5 19.5)"
        fill={colors.gray['50']}
        stroke={props.stroke}
      />
      <Mask id="path-2-inside-1_67_4" fill={colors.gray['50']}>
        <Path d="M20.5 28C22.7543 28 24.9163 27.1045 26.5104 25.5104C28.1045 23.9163 29 21.7543 29 19.5C29 17.2457 28.1045 15.0837 26.5104 13.4896C24.9163 11.8955 22.7543 11 20.5 11L20.5 19.5V28Z" />
      </Mask>
      <Path
        d="M20.5 28C22.7543 28 24.9163 27.1045 26.5104 25.5104C28.1045 23.9163 29 21.7543 29 19.5C29 17.2457 28.1045 15.0837 26.5104 13.4896C24.9163 11.8955 22.7543 11 20.5 11L20.5 19.5V28Z"
        fill={colors.gray['950']}
        stroke={props.stroke}
        strokeWidth={2}
        mask="url(#path-2-inside-1_67_4)"
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
 * An icon for the automatic app mode.
 */
function AutomaticLightDarkModeIcon({size = 24}: IconProps): JSX.Element {
  return (
    <SvgComponent height={size} width={size} stroke={colors.gray['950']} />
  );
}

export default AutomaticLightDarkModeIcon;
