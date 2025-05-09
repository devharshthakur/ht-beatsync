/**
 * @fileoverview System slice for the global store
 *
 * This file contains system-related state and methods for the
 * global store. It manages initialization and reset functionality.
 */

import { StateCreator } from 'zustand';
import { GlobalState, GlobalStateValues, SystemState } from '../types/state';
import { initializeAudioContext, loadAudioSource } from '../audio/utils';
import { STATIC_AUDIO_SOURCES } from '../audio/constants';

/**
 * Creates the system slice of the store
 *
 * @param {Function} set - Zustand's set function
 * @param {Function} get - Zustand's get function
 * @param {GlobalStateValues} initialState - The initial state values
 * @returns {SystemState} The system state slice
 */
export const createSystemSlice = (
  set: (partial: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>)) => void,
  get: () => GlobalState,
  initialState: GlobalStateValues,
): SystemState => {
  /**
   * Reinitializes the audio system
   */
  const initializeAudio = async () => {
    console.log('initializeAudio() called from systemSlice');
    // Create fresh audio context
    const audioContext = initializeAudioContext();

    // Create master gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1; // Default volume
    const sourceNode = audioContext.createBufferSource();

    // Ensure audio sources exist
    if (STATIC_AUDIO_SOURCES.length === 0) {
      console.error('No static audio sources available');
      return;
    }

    // Load first source
    const firstSource = await loadAudioSource({
      source: STATIC_AUDIO_SOURCES[0]!,
      audioContext,
    });

    // Decode initial first audio source
    sourceNode.buffer = firstSource.audioBuffer;
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    set({
      audioSources: [firstSource],
      audioPlayer: {
        audioContext,
        sourceNode,
        gainNode,
      },
      downloadedAudioIds: new Set<string>(),
      duration: firstSource.audioBuffer.duration,
    });
    console.log(`${0} Decoded source ${firstSource.name}`);

    // Load rest asynchronously, keep updating state
    for (let i = 1; i < STATIC_AUDIO_SOURCES.length; i++) {
      const source = STATIC_AUDIO_SOURCES[i]!;
      const state = get();
      const loadedSource = await loadAudioSource({
        source,
        audioContext,
      });
      set({ audioSources: [...state.audioSources, loadedSource] });
      console.log(`${i} Decoded source ${loadedSource.name}`);
    }
  };

  return {
    // Initial value
    isInitingSystem: initialState.isInitingSystem,

    /**
     * Sets whether the system is being initialized
     * When initialization completes, attempts to resume the audio context if needed
     *
     * @param {boolean} isIniting - Whether the system is initializing
     */
    setIsInitingSystem: async isIniting => {
      // When initialization is complete (isIniting = false), check if we need to resume audio
      if (!isIniting) {
        const state = get();
        const audioContext = state.audioPlayer?.audioContext;
        // Modern browsers require user interaction before playing audio
        // If context is suspended, we need to resume it
        if (audioContext && audioContext.state === 'suspended') {
          try {
            await audioContext.resume();
            console.log('AudioContext resumed via user gesture');
          } catch (err) {
            console.warn('Failed to resume AudioContext', err);
          }
        }
      }

      // Update the initialization state
      set({ isInitingSystem: isIniting });
    },

    /**
     * Resets the entire store to initial state
     * Closes existing resources and reinitializes the system
     */
    resetStore: () => {
      const state = get();

      // Stop any playing audio
      if (state.isPlaying && state.audioPlayer) {
        try {
          state.audioPlayer.sourceNode.stop();
        } catch (e) {
          // Ignore errors if already stopped
        }
      }

      // Close the websocket connection if it exists
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.close();
      }

      // Close the old audio context if it exists
      if (state.audioPlayer?.audioContext) {
        state.audioPlayer.audioContext.close().catch(() => {});
      }

      // Reset state to initial values
      set(initialState);

      // Reinitialize audio from scratch
      initializeAudio();
    },
  };
};
