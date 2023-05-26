import React from 'react';
import {Circle, Path, Symbol, Text} from 'react-native-svg';
import {ColorValue} from 'react-native';

export const MARKER_BASE_WIDTH = 33;
export const MARKER_BASE_HEIGHT = 43;

const C_X = 16.3068;
const C_Y = 14.1218;
const R = 14.1218;

interface MapMarkerProps {
  id: string;
  color: ColorValue;
  textColor: ColorValue;
  label?: string;
}

function MapMarker({id, color, textColor, label}: MapMarkerProps): JSX.Element {
  return (
    <Symbol id={id} viewBox={`0 0 ${MARKER_BASE_WIDTH} ${MARKER_BASE_HEIGHT}`}>
      <Circle cx={C_X} cy={C_Y} r={R} stroke={color} fill={color} />
      <Path
        d="M16.0107 42.4782 L 2.36616 17.9556 L 30.0974 18.2009 L 16.0107 42.4782 Z"
        stroke={color}
        fill={color}
      />
      {label && (
        <Text
          x={C_X}
          y={C_Y + R / 2}
          fill={textColor}
          stroke="none"
          textAnchor="middle"
          fontSize={22}>
          {label}
        </Text>
      )}
    </Symbol>
  );
}

export default MapMarker;
