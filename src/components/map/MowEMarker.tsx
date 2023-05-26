import React from 'react';
import {Circle, Line, Marker, Path, Rect} from 'react-native-svg';
import colors from '../../styles/colors';

export const MARKER_BASE_WIDTH = 79;
export const MARKER_BASE_HEIGHT = 59.25;

interface MowEMarkerProps {
  id: string;
}

function MowEMarker({id}: MowEMarkerProps): JSX.Element {
  const stroke = colors.gray['950'];

  return (
    <Marker
      id={id}
      viewBox={`0 0 ${MARKER_BASE_WIDTH} ${MARKER_BASE_HEIGHT}`}
      // With orient=180 the icon will always have the same rotation, in the way mow-e should be rotated
      orient="180"
      // Using halv of the width/height values as reference points to center icon on the path
      refX={MARKER_BASE_WIDTH / 2}
      refY={MARKER_BASE_HEIGHT / 2}
      markerUnits="strokeWidth"
      markerWidth={20}
      markerHeight={20}>
      <Path
        d="m 33.6481,12.4353 h 12.4352 v 7.3148 H 33.6481 Z"
        fill={colors.gray['300']}
        stroke={colors.gray['300']}
      />
      <Rect
        x={12.9352}
        y={20.25}
        width={53.861099}
        height={26.796301}
        fill={colors.primary.dark}
        stroke={stroke}
      />
      <Rect
        x={0.5}
        y={35.611099}
        width={26.796301}
        height={23.138901}
        fill={colors.gray['300']}
        stroke={stroke}
      />
      <Rect
        x={51.703701}
        y={35.611099}
        width={26.796301}
        height={23.138901}
        fill={colors.gray['300']}
        stroke={stroke}
      />
      <Path d="m 33.6481,12.4353 v 7.3148 Z" fill={colors.gray['300']} />
      <Path d="m 46.0833,12.4353 v 7.3148 Z" fill={colors.gray['300']} />
      <Rect
        x={23.1759}
        y={0.5}
        width={32.648102}
        height={11.4352}
        fill={colors.gray['300']}
        stroke={stroke}
      />
      <Circle
        cx={32.5509}
        cy={6.21769}
        r={3.0416701}
        fill={colors.gray['200']}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Circle
        cx={46.4491}
        cy={6.21769}
        r={3.0416701}
        fill={colors.gray['200']}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Circle
        cx={32.916698}
        cy={6.5833602}
        r={2.1944399}
        fill={colors.gray['950']}
      />
      <Circle
        cx={46.083302}
        cy={6.5833602}
        r={2.1944399}
        fill={colors.gray['950']}
      />
      <Line
        x1={2.1944399}
        y1={38.5186}
        x2={25.6019}
        y2={38.5186}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={53.398102}
        y1={38.5186}
        x2={76.805603}
        y2={38.5186}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={53.398102}
        y1={42.907501}
        x2={76.805603}
        y2={42.907501}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={53.398102}
        y1={47.296398}
        x2={76.805603}
        y2={47.296398}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={53.398102}
        y1={51.685299}
        x2={76.805603}
        y2={51.685299}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={53.398102}
        y1={56.074001}
        x2={76.805603}
        y2={56.074001}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={2.1944399}
        y1={51.685299}
        x2={25.6019}
        y2={51.685299}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={2.1944399}
        y1={56.074001}
        x2={25.6019}
        y2={56.074001}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={2.1944399}
        y1={42.907501}
        x2={25.6019}
        y2={42.907501}
        stroke={stroke}
        strokeWidth={0.5}
      />
      <Line
        x1={2.1944399}
        y1={47.296398}
        x2={25.6019}
        y2={47.296398}
        stroke={stroke}
        strokeWidth={0.5}
      />
    </Marker>
  );
}

export default MowEMarker;
