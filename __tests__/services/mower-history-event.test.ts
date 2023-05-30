import {
  getLatestSessionId,
  isEventToShowDependingOnSessionId,
  isEventWithImageAttached,
  mowerHistoryEventToImageHistoryItem,
  parseMowerHistoryEventFromWebSocketMessageBody,
} from '../../src/services/mower-history-event';
import MowerHistoryEventMowerState from '../../src/models/MowerHistoryEventMowerState';
import MowerHistoryEvent from '../../src/models/MowerHistoryEvent';
import {MowingSessionsToShowInHistory} from '../../src/hooks/useMowingSessionsToShowInHistory';

function createEvent(
  customEventDetails: Partial<MowerHistoryEvent>,
): MowerHistoryEvent {
  return {
    imageId: null,
    extra: '',
    mowerId: 'foo',
    sessionId: 42,
    source: 'api',
    state: MowerHistoryEventMowerState.Working,
    time: 42,
    x: 0,
    y: 0,
    z: 0,
    ...customEventDetails,
  };
}

describe('mower-history-event', () => {
  it('checks whether an event has an image attached', () => {
    const resultWithImage = isEventWithImageAttached(
      createEvent({imageId: 'foo', extra: 'bar'}),
    );
    expect(resultWithImage).toBeTruthy();

    const resultWithoutImage = isEventWithImageAttached(createEvent({}));
    expect(resultWithoutImage).toBeFalsy();
  });

  it('converts MowerHistoryEvent to ImageHistoryItem', () => {
    const event = createEvent({
      imageId: 'foo-image',
      extra: '{Foo=0.9,Bar=0.1}',
    });

    const result = mowerHistoryEventToImageHistoryItem(event);

    expect(result.imageId).toBe(event.imageId);
    // getTime() is in ms, while event.time is in s
    expect(result.date.getTime() / 1000).toBe(event.time);
    expect(result.classificationResult).toStrictEqual({
      label: 'Foo',
      probability: '0.9',
    });
  });

  it('throws error when converting MowerHistoryEvent to ImageHistoryItem without image attached', () => {
    const event = createEvent({});

    try {
      mowerHistoryEventToImageHistoryItem(event);
      fail('Missing image in event was not detected');
    } catch (e) {
      // Error is expected
    }
  });

  it('gets the latest session id from events', () => {
    const events = [
      createEvent({sessionId: 1}),
      createEvent({sessionId: 2}),
      createEvent({sessionId: 3}),
    ];

    const result = getLatestSessionId(events);

    expect(result).toBe(3);
  });

  it('filters event correctly depending on session id', () => {
    const event = createEvent({sessionId: 1});

    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId,
        MowingSessionsToShowInHistory.latestSession,
      ),
    ).toBeTruthy();
    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId + 1,
        MowingSessionsToShowInHistory.latestSession,
      ),
    ).toBeFalsy();
    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId + 2,
        MowingSessionsToShowInHistory.lastThreeSessions,
      ),
    ).toBeTruthy();
    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId + 3,
        MowingSessionsToShowInHistory.lastThreeSessions,
      ),
    ).toBeFalsy();
    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId + 3,
        MowingSessionsToShowInHistory.lastTenSessions,
      ),
    ).toBeTruthy();
    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId + 11,
        MowingSessionsToShowInHistory.lastTenSessions,
      ),
    ).toBeFalsy();
    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId + 11,
        MowingSessionsToShowInHistory.allSessions,
      ),
    ).toBeTruthy();
    expect(
      isEventToShowDependingOnSessionId(
        event,
        event.sessionId + 1337,
        MowingSessionsToShowInHistory.allSessions,
      ),
    ).toBeTruthy();
  });

  it('parses event from WebSocket message body', () => {
    const event = createEvent({});
    const expectedEvent = createEvent({
      sessionId: 7,
      source: 'websocket',
    });

    const result = parseMowerHistoryEventFromWebSocketMessageBody(
      JSON.stringify({...event, stateId: event.state}),
      7,
    );

    expect(result).toStrictEqual(expectedEvent);
  });
});
