import * as React from 'react';
import Svg, {SvgProps, Line} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 27 23" fill="none" {...props}>
      <Line
        x1={0.573462}
        y1={15.1808}
        x2={10.5735}
        y2={22.1808}
        stroke={props.stroke}
        strokeWidth={2}
      />
      <Line
        x1={9.22276}
        y1={22.3708}
        x2={26.2228}
        y2={1.3708}
        stroke={props.stroke}
        strokeWidth={2}
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
