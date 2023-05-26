import {createContext, useContext} from 'react';
import {Client} from '@stomp/stompjs';

/**
 * The properties saved in the `ApiWebSocketContext`.
 */
interface ApiWebSocketContextType {
  /**
   * The api WebSocket, or null if none.
   */
  apiWebSocket: Client | null;
  /**
   * Setter for the api WebSocket.
   *
   * @param ws Client the new WebSocket to set active.
   */
  setApiWebSocket: (ws: Client | null) => void;
}

/**
 * Context that stores the api WebSocket and a setter to change it.
 */
export const ApiWebSocketContext = createContext<ApiWebSocketContextType>({
  apiWebSocket: null,
  setApiWebSocket: () => {},
});

/**
 * Returns the api WebSocket and a setter to change it.
 */
const useApiWebSocket = () => useContext(ApiWebSocketContext);

export default useApiWebSocket;
