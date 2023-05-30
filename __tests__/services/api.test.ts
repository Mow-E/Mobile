import {
  createWebSocketClient,
  fetchWithAuthorization,
  MOWER_EVENT_IMAGE_URL,
} from '../../src/services/api';
import {mockFetch} from '../../jest/utils';

describe('api', () => {
  it('generates mower image url', () => {
    const imageId = 'foo-bar-baz';
    const result = MOWER_EVENT_IMAGE_URL(imageId);
    expect(result).toContain(imageId);
  });

  it('fetches with auth token', async () => {
    const expectedFetchResult = {foo: 'bar'};

    mockFetch(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedFetchResult),
      }),
    );

    const result = await fetchWithAuthorization(
      'foo.local',
      undefined,
      'GET',
      'token',
    );
    const jsonResult = await result.json();

    expect(jsonResult).toBe(expectedFetchResult);
  });

  it('fetches without auth token', async () => {
    const expectedFetchResult = {foo: 'bar'};

    mockFetch(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedFetchResult),
      }),
    );

    const result = await fetchWithAuthorization(
      'foo.local',
      undefined,
      'GET',
      undefined,
    );
    const jsonResult = await result.json();

    expect(jsonResult).toBe(expectedFetchResult);
  });

  it('creates a WebSocket client', () => {
    const client = createWebSocketClient('token');

    expect(client).not.toBeNull();
    expect(client.active).toBeFalsy();
    expect(client.connected).toBeFalsy();
    expect(Object.entries(client.connectHeaders)).toContainEqual([
      'x-auth-token',
      'token',
    ]);
  });
});
