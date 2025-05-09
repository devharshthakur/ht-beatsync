/**
 * @fileoverview Network utility functions
 *
 * This file contains utility functions for network operations, including
 * WebSocket management and validation.
 */

/**
 * Gets the WebSocket from state, throwing an error if not initialized
 *
 * @template T - Type with a socket property
 * @param {T} state - State object containing the socket
 * @returns {Object} Object containing the socket
 * @throws {Error} If the socket is not initialized
 */
export const getSocket = <T extends { socket: WebSocket | null }>(state: T) => {
  if (!state.socket) {
    throw new Error('Socket not initialized');
  }
  return {
    socket: state.socket,
  };
};
