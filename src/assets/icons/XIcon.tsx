import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 160 206" fill="none" {...props}>
      <Path
        stroke={props.stroke}
        strokeWidth={15}
        d="M0-7.5h241.8M0-7.5h241.8M0-7.5h241.8"
        transform="matrix(.5969 -.80231 .72118 .69274 11 205)"
      />
      <Path
        stroke={props.stroke}
        strokeWidth={15}
        d="M0-7.5h241.8M0-7.5h241.8M0-7.5h241.8"
        transform="matrix(.59663 .80251 -.87096 .49135 2 11)"
      />
    </Svg>
  );
}

/**
 * An icon for a check mark.
 */
function CheckMarkIcon({size = 24, colored = false}: IconProps): JSX.Element {
  const strokeColor =
    typeof colored === 'boolean' ? colors.gray['950'] : colored;

  return <SvgComponent height={size} width={size} stroke={strokeColor} />;
}

export default CheckMarkIcon;
