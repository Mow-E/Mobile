import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 22 24" fill="none" {...props}>
      <Path
        d="M4.52273 24H0.795455L9.17045 0.727272H13.2273L21.6023 24H17.875L11.2955 4.95454H11.1136L4.52273 24ZM5.14773 14.8864H17.2386V17.8409H5.14773V14.8864Z"
        fill={props.stroke}
      />
    </Svg>
  );
}

/**
 * An icon for the automatic mower mode.
 */
function AutomaticModeIcon({
  size = 24,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted ? colors.gray['50'] : colors.gray['950'];

  return <SvgComponent height={size} width={size} stroke={strokeColor} />;
}

export default AutomaticModeIcon;
