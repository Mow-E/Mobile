import React, {useCallback, useMemo} from 'react';
import Svg, {Defs, Polyline, Use} from 'react-native-svg';
import MowerHistoryEvent from '../../models/MowerHistoryEvent';
import MowerHistoryEventMowerState from '../../models/MowerHistoryEventMowerState';
import MapMarker, {MARKER_BASE_HEIGHT, MARKER_BASE_WIDTH} from './MapMarker';
import colors from '../../styles/colors';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import MowEMarker from './MowEMarker';
import FlagMarker from './FlagMarker';

/**
 * The width to normalize the map coordinates to.
 */
const NORMALIZED_MAP_WIDTH = 1_000;
/**
 * The height to normalize the map coordinates to.
 */
const NORMALIZED_MAP_HEIGHT = 1_000;

const MARKER_HEIGHT = NORMALIZED_MAP_HEIGHT / 12;
const MARKER_WIDTH = (MARKER_BASE_WIDTH / MARKER_BASE_HEIGHT) * MARKER_HEIGHT;

interface MowerMapProps {
  events: MowerHistoryEvent[];
}

function MowerMap({events}: MowerMapProps): JSX.Element {
  const isInDarkMode = useIsInDarkMode();

  const [globalMinX, globalMaxX, globalMinY, globalMaxY] = useMemo<
    [number, number, number, number]
  >(() => {
    if (events.length === 0) {
      return [0, 0, 0, 0];
    }

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    for (let i = 0; i < events.length; i++) {
      const {x, y} = events[i];

      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y < minY) {
        minY = y;
      }
      if (y > maxY) {
        maxY = y;
      }
    }

    return [minX, maxX, minY, maxY];
  }, [events]);

  const originalWidthHeightRatio = useMemo<number>(() => {
    const width = globalMaxX - globalMinX;
    let height = globalMaxY === globalMinY ? width : globalMaxY - globalMinY;

    return width === height ? 1 : width / height;
  }, [globalMinX, globalMaxX, globalMinY, globalMaxY]);

  const normalizeXValue = useCallback(
    (value: number) => {
      const divisor = globalMaxX - globalMinX;

      return (
        ((value - globalMinX) *
          NORMALIZED_MAP_WIDTH *
          originalWidthHeightRatio) /
        (divisor !== 0 ? divisor : 1)
      );
    },
    [globalMinX, globalMaxX, originalWidthHeightRatio],
  );

  const normalizeYValue = useCallback(
    (value: number) => {
      const divisor = globalMaxY - globalMinY;

      return (
        ((value - globalMinY) * NORMALIZED_MAP_HEIGHT) /
        (divisor !== 0 ? divisor : 1)
      );
    },
    [globalMinY, globalMaxY],
  );

  const linePointsToDraw = useMemo<string>(() => {
    return (
      events
        // Sort ascending in time (start with earliest event)
        .sort((a, b) => a.time - b.time)
        .map(({x, y}) => `${normalizeXValue(x)},${normalizeYValue(y)}`)
        .join(' ')
    );
  }, [events, normalizeXValue, normalizeYValue]);

  const eventsWithMarkers = useMemo<MowerHistoryEvent[]>(
    () =>
      events.filter(event =>
        [
          MowerHistoryEventMowerState.Collision,
          MowerHistoryEventMowerState.Start,
          MowerHistoryEventMowerState.Stop,
          MowerHistoryEventMowerState.Error,
          MowerHistoryEventMowerState.Border,
        ].includes(event.state),
      ),
    [events],
  );

  const renderedMowerMapMarkers = useMemo<JSX.Element[]>(() => {
    const renderedTimestamps: number[] = [];

    return eventsWithMarkers
      .map(event => {
        if (renderedTimestamps.includes(event.time)) {
          return null;
        }

        renderedTimestamps.push(event.time);

        let id = '';

        switch (event.state) {
          case MowerHistoryEventMowerState.Start:
            id = '#start-marker';
            break;
          case MowerHistoryEventMowerState.Stop:
            id = '#stop-marker';
            break;
          case MowerHistoryEventMowerState.Error:
            id = '#error-marker';
            break;
          case MowerHistoryEventMowerState.Collision:
            id = '#collision-marker';
            break;
          case MowerHistoryEventMowerState.Border:
            id = '#border-marker';
            break;
        }

        return (
          <Use
            href={id}
            // Shift marker coordinates so that marker is placed with its tip on the actual event coordinate
            x={normalizeXValue(event.x) - MARKER_WIDTH / 2}
            y={normalizeYValue(event.y) - MARKER_HEIGHT}
            width={MARKER_WIDTH}
            height={MARKER_HEIGHT}
            key={`map-marker-${event.mowerId}-${event.time}`}
          />
        );
      })
      .filter(value => value !== null) as JSX.Element[];
  }, [eventsWithMarkers, normalizeXValue, normalizeYValue]);

  return (
    <Svg
      // Expand viewbox so that markers will be fully visible on all sides (going out of the actual map).
      // The horizontal sides are each expanded by halv of the marker width,
      // which would have been cut if the marker is set on a point at the border,
      // plus some extra for bigger markers like mow-e.
      // The top is expanded by the height of a marker, which would have been cut if the marker is set at y=0.
      viewBox={`-${MARKER_WIDTH} -${MARKER_HEIGHT / 2} ${
        NORMALIZED_MAP_WIDTH * originalWidthHeightRatio + MARKER_WIDTH * 2
      } ${NORMALIZED_MAP_HEIGHT}`}
      fill="none">
      <Defs>
        <MapMarker
          id="collision-marker"
          color={colors.gray['400']}
          textColor={colors.gray['50']}
          label="C"
        />
        <MapMarker
          id="error-marker"
          color={colors.red.light}
          textColor={colors.gray['50']}
          label="E"
        />
        <MapMarker
          id="border-marker"
          color={colors.gray['950']}
          textColor={colors.gray['50']}
          label="B"
        />
        <FlagMarker
          id="start-marker"
          color={colors.primary.light}
          textColor={colors.gray['50']}
        />
        <FlagMarker
          id="stop-marker"
          color={colors.red.dark}
          textColor={colors.gray['50']}
        />
        <MowEMarker id="mow-e-marker" />
      </Defs>
      {/* Draw the line after the markers so that the mow-e marker is drawn on top of other markers */}
      <Polyline
        points={linePointsToDraw}
        stroke={isInDarkMode ? colors.gray['50'] : colors.gray['950']}
        strokeWidth={NORMALIZED_MAP_WIDTH / 250}
        strokeDasharray={NORMALIZED_MAP_WIDTH / 70}
        markerEnd="url(#mow-e-marker)"
      />
      {renderedMowerMapMarkers}
    </Svg>
  );
}

export default MowerMap;
