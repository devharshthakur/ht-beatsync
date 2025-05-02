/**
 * @fileoverview WebSocket utilities for client-server communication
 *
 * This module provides utilities for working with WebSockets in the BeatSync application.
 * It offers standardized methods for sending requests to the server, with proper typing
 * and error handling.
 *
 * The utilities in this file ensure consistent communication patterns across the application
 * and help maintain type safety for WebSocket messages. This is particularly important
 * for real-time applications like BeatSync where reliable message passing is crucial.
 *
 * This file pairs with ws-hooks.ts which provides React hooks for managing
 * WebSocket connections with features like automatic reconnection and
 * clock synchronization.
 */

import { WSRequestType } from '@repo/shared';

/**
 * Parameters for sending a WebSocket request
 *
 * @interface WSRequestParams
 * @property {WebSocket} ws - The WebSocket connection to use
 * @property {WSRequestType} request - The request data to send
 */
export interface WSRequestParams {
  ws: WebSocket;
  request: WSRequestType;
}

/**
 * Sends a WebSocket request to the server
 *
 * This function takes a WebSocket connection and a request object,
 * serializes the request to JSON, and sends it over the WebSocket.
 * It checks if the WebSocket is open before attempting to send.
 *
 * @param {WSRequestParams} params - The WebSocket and request parameters
 * @param {WebSocket} params.ws - The WebSocket connection to use
 * @param {WSRequestType} params.request - The request data to send
 * @returns {void}
 */
export const sendWSRequest = ({ ws, request }: WSRequestParams): void => {
  if (ws.readyState !== WebSocket.OPEN) {
    console.error('Cannot send request: WebSocket is not open');
    return;
  }

  ws.send(JSON.stringify(request));
};
