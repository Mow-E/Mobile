import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 33 33" fill="none" {...props}>
      <Circle cx={16.5} cy={16.5} r={16} stroke={props.stroke} />
      <Path
        d="M15.4276 24V13.0909H17.5511V24H15.4276ZM16.5 11.4077C16.1307 11.4077 15.8134 11.2846 15.5483 11.0384C15.2879 10.7874 15.1577 10.4891 15.1577 10.1435C15.1577 9.79309 15.2879 9.49479 15.5483 9.24858C15.8134 8.99763 16.1307 8.87216 16.5 8.87216C16.8693 8.87216 17.1842 8.99763 17.4446 9.24858C17.7098 9.49479 17.8423 9.79309 17.8423 10.1435C17.8423 10.4891 17.7098 10.7874 17.4446 11.0384C17.1842 11.2846 16.8693 11.4077 16.5 11.4077Z"
        fill={props.stroke}
        strokeWidth={0.001}
      />
    </Svg>
  );
}

/**
 * An icon that shows an info icon.
 */
function InfoIcon({
  size = 24,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted ? colors.gray['50'] : colors.gray['950'];

  return <SvgComponent height={size} width={size} stroke={strokeColor} />;
}

export default InfoIcon;
