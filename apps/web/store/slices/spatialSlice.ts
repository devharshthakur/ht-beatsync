/**
 * @fileoverview Spatial audio slice for the global store
 *
 * This file contains the spatial audio-related state and methods for the
 * global store. It manages positioning and spatial audio processing.
 */

import { StateCreator } from 'zustand';
import { ClientActionEnum, PositionType, SpatialConfigType } from '@repo/shared';
import { sendWSRequest } from '@/utils/ws';
import { GlobalState, SpatialState } from '../types/state';
import { getAudioPlayer } from '../audio/utils';
import { getSocket } from '../network/utils';
import { useRoomStore } from '../room';

/**
 * Creates the spatial audio slice of the store
 *
 * @param {Function} set - Zustand's set function
 * @param {Function} get - Zustand's get function
 * @returns {SpatialState} The spatial audio state slice
 */
export const createSpatialSlice = (
  set: (partial: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>)) => void,
  get: () => GlobalState,
): SpatialState => {
  return {
    // Initial values
    spatialConfig: undefined,
    listeningSourcePosition: { x: 0, y: 0 }, // Will be properly initialized from initialState
    isDraggingListeningSource: false,
    isSpatialAudioEnabled: false,

    /**
     * Sends a WebSocket request to start spatial audio mode
     */
    startSpatialAudio: () => {
      const state = get();
      const { socket } = getSocket(state);

      sendWSRequest({
        ws: socket,
        request: {
          type: ClientActionEnum.enum.START_SPATIAL_AUDIO,
        },
      });
    },

    /**
     * Sends a WebSocket request to stop spatial audio mode
     */
    sendStopSpatialAudio: () => {
      const state = get();
      const { socket } = getSocket(state);

      sendWSRequest({
        ws: socket,
        request: {
          type: ClientActionEnum.enum.STOP_SPATIAL_AUDIO,
        },
      });
    },

    /**
     * Sets the spatial configuration
     *
     * @param {SpatialConfigType} spatialConfig - The spatial audio configuration
     */
    setSpatialConfig: spatialConfig => set({ spatialConfig }),

    /**
     * Updates the listening source position and broadcasts the change
     *
     * @param {PositionType} position - The new position
     */
    updateListeningSource: ({ x, y }) => {
      const state = get();
      const { socket } = getSocket(state);

      // Update local state
      set({ listeningSourcePosition: { x, y } });

      sendWSRequest({
        ws: socket,
        request: { type: ClientActionEnum.enum.SET_LISTENING_SOURCE, x, y },
      });
    },

    /**
     * Sets the listening source position without broadcasting
     *
     * @param {PositionType} position - The new position
     */
    setListeningSourcePosition: position => {
      set({ listeningSourcePosition: position });
    },

    /**
     * Sets whether the user is dragging the listening source
     *
     * @param {boolean} isDragging - Whether the user is dragging
     */
    setIsDraggingListeningSource: isDragging => {
      set({ isDraggingListeningSource: isDragging });
    },

    /**
     * Sets whether spatial audio is enabled
     *
     * @param {boolean} isEnabled - Whether spatial audio is enabled
     */
    setIsSpatialAudioEnabled: isEnabled => {
      set({ isSpatialAudioEnabled: isEnabled });
    },

    /**
     * Processes a stop spatial audio command
     * Resets gain values and disables spatial audio
     */
    processStopSpatialAudio: () => {
      const state = get();

      const { gainNode } = getAudioPlayer(state);
      gainNode.gain.cancelScheduledValues(0);
      gainNode.gain.value = 1;

      set({ isSpatialAudioEnabled: false });
      set({ spatialConfig: undefined });
    },

    /**
     * Processes a spatial configuration update
     * Applies gain changes and updates positions
     *
     * @param {SpatialConfigType} config - The new spatial configuration
     */
    processSpatialConfig: (config: SpatialConfigType) => {
      const state = get();
      set({ spatialConfig: config });
      const { gains, listeningSource } = config;

      // Don't set if we were the ones dragging the listening source
      if (!state.isDraggingListeningSource) {
        set({ listeningSourcePosition: listeningSource });
      }

      // Extract out what this client's gain is:
      const userId = useRoomStore.getState().userId;
      if (!userId) return;

      const user = gains[userId];
      if (!user) return;

      const { gain, rampTime } = user;

      // Process
      const { audioContext, gainNode } = getAudioPlayer(state);

      const now = audioContext.currentTime;
      const currentGain = gainNode.gain.value;

      // Reset
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(currentGain, now);

      // Ramp time is set server side
      gainNode.gain.linearRampToValueAtTime(gain, now + rampTime);
    },
  };
};
