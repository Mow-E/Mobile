import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 39 23" fill="none" {...props}>
      <Circle cx={19.5} cy={12.5} r={8} fill="white" stroke="black" />
      <Circle cx={19.5} cy={12.5} r={5.5} fill="black" />
      <Path
        d="M6.28571 7.79858C4.02141 9.34465 1 12.3729 1 12.3729C1 12.3729 3.98596 15.5874 6.28571 17.2014C9.00758 19.1117 10.7114 20.1181 13.95 21.0134C18.5128 22.2748 21.5778 22.3819 26.1071 21.0134C29.1484 20.0945 30.7491 19.1109 33.2429 17.2014C35.356 15.5834 38 12.3729 38 12.3729C38 12.3729 35.3188 9.34702 33.2429 7.79858C30.724 5.91977 29.1484 4.90548 26.1071 3.98661C21.5778 2.61814 18.5128 2.7252 13.95 3.98661C10.7114 4.88193 9.03326 5.92255 6.28571 7.79858Z"
        stroke={props.stroke}
      />
    </Svg>
  );
}

/**
 * An icon for an eye.
 */
function EyeIcon({
  size = 24,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted ? colors.gray['50'] : colors.gray['950'];

  return <SvgComponent height={size} width={size} stroke={strokeColor} />;
}

export default EyeIcon;
