import * as React from 'react';
import Svg, {SvgProps, Line} from 'react-native-svg';
import IconProps from './IconProps';
import colors from '../../styles/colors';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 23 28" fill="none" {...props}>
      <Line
        x1={22.2544}
        y1={14.4305}
        x2={0.254366}
        y2={27.4305}
        stroke={props.stroke}
      />
      <Line
        x1={21.7226}
        y1={14.416}
        x2={0.72265}
        y2={0.416025}
        stroke={props.stroke}
      />
    </Svg>
  );
}

/**
 * An icon for a forward arrow.
 */
function ArrowForwardIcon({size = 24}: IconProps): JSX.Element {
  return (
    <SvgComponent height={size} width={size} stroke={colors.gray['950']} />
  );
}

export default ArrowForwardIcon;
