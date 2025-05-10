/**
 * @fileoverview Network slice for the global store
 *
 * This file contains the network-related state and methods for the
 * global store. It manages WebSocket connections and client information.
 */

import { StateCreator } from 'zustand';
import { ClientActionEnum } from '@repo/shared';
import { sendWSRequest } from '@/utils/ws';
import { GlobalState, NetworkState } from '../types/state';
import { getSocket } from '../network/utils';

/**
 * Creates the network slice of the store
 *
 * @param {Function} set - Zustand's set function
 * @param {Function} get - Zustand's get function
 * @returns {NetworkState} The network state slice
 */
export const createNetworkSlice = (
  set: (partial: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>)) => void,
  get: () => GlobalState,
): NetworkState => {
  return {
    // Initial values
    socket: null,
    connectedClients: [],

    /**
     * Sets the WebSocket connection
     *
     * @param {WebSocket} socket - The WebSocket connection
     */
    setSocket: socket => set({ socket }),

    /**
     * Sets the list of connected clients
     *
     * @param {ClientType[]} clients - Array of connected clients
     */
    setConnectedClients: clients => set({ connectedClients: clients }),

    /**
     * Requests reupload of an audio file
     *
     * @param {string} audioId - ID of the audio to reupload
     * @param {string} audioName - Name of the audio to reupload
     */
    reuploadAudio: (audioId, audioName) => {
      const state = get();
      const { socket } = getSocket(state);

      sendWSRequest({
        ws: socket,
        request: {
          type: ClientActionEnum.enum.REUPLOAD_AUDIO,
          audioId,
          audioName,
        },
      });
    },

    /**
     * Requests reordering of a client in the spatial view
     *
     * @param {string} clientId - ID of the client to reorder
     */
    reorderClient: clientId => {
      const state = get();
      const { socket } = getSocket(state);

      sendWSRequest({
        ws: socket,
        request: {
          type: ClientActionEnum.enum.REORDER_CLIENT,
          clientId,
        },
      });
    },
  };
};
