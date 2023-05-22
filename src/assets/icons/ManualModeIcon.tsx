import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M0.556818 0.727272H4.81818L12.2273 18.8182H12.5L19.9091 0.727272H24.1705V24H20.8295V7.15909H20.6136L13.75 23.9659H10.9773L4.11364 7.14773H3.89773V24H0.556818V0.727272Z"
        fill={props.stroke}
      />
    </Svg>
  );
}

/**
 * An icon for the manual mower mode.
 */
function ManualModeIcon({
  size = 24,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted ? colors.gray['50'] : colors.gray['950'];

  return <SvgComponent height={size} width={size} stroke={strokeColor} />;
}

export default ManualModeIcon;
