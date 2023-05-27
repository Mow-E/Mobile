import React from 'react';
import {Line, Rect, Symbol} from 'react-native-svg';
import {ColorValue} from 'react-native';
import colors from '../../styles/colors';
import {MARKER_BASE_HEIGHT, MARKER_BASE_WIDTH} from './MapMarker';

const POLE_WIDTH = 3;

interface FlagMarkerProps {
  id: string;
  color: ColorValue;
  textColor: ColorValue;
  label?: string;
}

function FlagMarker({id, color}: FlagMarkerProps): JSX.Element {
  return (
    <Symbol
      id={id}
      viewBox={`-${
        MARKER_BASE_WIDTH / 2
      } 0 ${MARKER_BASE_WIDTH} ${MARKER_BASE_HEIGHT}`}>
      <Line
        x1={0}
        y1={MARKER_BASE_HEIGHT}
        x2={0}
        stroke={colors.gray['950']}
        strokeWidth={POLE_WIDTH}
      />
      <Rect
        x={POLE_WIDTH / 2}
        width={MARKER_BASE_WIDTH - POLE_WIDTH}
        height={MARKER_BASE_HEIGHT / 2}
        fill={color}
      />
    </Symbol>
  );
}

export default FlagMarker;
