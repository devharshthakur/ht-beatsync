/**
 * @fileoverview Network utility functions
 *
 * This file contains utility functions for network operations, including
 * WebSocket management and validation.
 */

/**
 * Gets the WebSocket from state, handling the case when socket is not available
 *
 * @template T - Type with a socket property
 * @param {T} state - State object containing the socket
 * @returns {Object} Object containing the socket or null
 */
export const getSocket = <T extends { socket: WebSocket | null }>(state: T) => {
  if (!state.socket) {
    console.warn('Socket not initialized, returning null socket');
    return {
      socket: null,
    };
  }
  return {
    socket: state.socket,
  };
};
