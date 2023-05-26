import MowerHistoryEventMowerState from '../models/MowerHistoryEventMowerState';
import {Client} from '@stomp/stompjs';

/** The base url of the API */
const BASE_URL = 'http://mow-e.me:80';
/** The url to the login endpoint */
export const LOGIN_URL = `${BASE_URL}/auth/login`;

/** The url to the register endpoint */
export const REGISTER_URL = `${BASE_URL}/auth/signup`;

/** The url to a test endpoint, e.g. to check that a token is valid or the api is reachable */
export const API_TEST_URL = `${BASE_URL}/hello`;

/** The url to the mower history endpoint, from where a history of past mowing sessions and events can be received */
export const MOWER_HISTORY_URL = `${BASE_URL}/api/mower/history`;

/** The url to the mower event image endpoint, from where an image (given by id) can be accessed */
export const MOWER_EVENT_IMAGE_URL = (imageId: string) =>
  `${BASE_URL}/api/mower/images/${imageId}`;

/** The url to the api's WebSocket endpoint */
export const WEB_SOCKET_URL = `${BASE_URL}/websocket`;

const WEB_SOCKET_RECONNECT_DELAY = 5_000;
const WEB_SOCKET_HEARTBEAT_INCOMING = 4_000;
const WEB_SOCKET_HEARTBEAT_OUTGOING = 4_000;

export interface WebSocketCoordinateMessage {
  mowerId: string;
  x: number;
  y: number;
  z: number;
  time: number;
  extra: string;
  stateId: MowerHistoryEventMowerState;
  state: string;
}

/**
 * Fetches the given url with an added authorization token (if given).
 */
export async function fetchWithAuthorization(
  url: string,
  body: object = {},
  method: 'GET' | 'POST' = 'GET',
  authorizationToken?: string,
): Promise<Response> {
  if (authorizationToken === undefined) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' ? JSON.stringify(body) : undefined,
    });
  }

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  });
}

/**
 * Creates a new WebSocket client to the api.
 *
 * @param authToken string the auth token to use for the api.
 *
 * @return Client the new client.
 */
export function createWebSocketClient(authToken: string): Client {
  return new Client({
    brokerURL: WEB_SOCKET_URL,
    connectHeaders: {
      'x-auth-token': authToken,
    },
    reconnectDelay: WEB_SOCKET_RECONNECT_DELAY,
    heartbeatIncoming: WEB_SOCKET_HEARTBEAT_INCOMING,
    heartbeatOutgoing: WEB_SOCKET_HEARTBEAT_OUTGOING,
  });
}
