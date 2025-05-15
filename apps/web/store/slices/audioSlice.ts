/**
 * @fileoverview Audio slice for the global store
 *
 * This file contains the audio-related state and methods for the
 * global store. It manages audio playback, sources, and controls.
 */

import { toast } from 'sonner';
import { AudioState, GlobalState, GlobalStateValues } from '../types/state';
import { getAudioPlayer } from '../audio/utils';
import { initializeAudioContext, loadAudioSource } from '../audio/utils';
import { STATIC_AUDIO_SOURCES } from '../audio/constants';
import { getSocket } from '../network/utils';
import { getWaitTimeSeconds } from '../../utils/sync';
import { sendWSRequest } from '@/utils/ws';
import { ClientActionEnum } from '@repo/shared';
import { RawAudioSource } from '@/lib/localTypes';

/**
 * Creates the audio slice of the store
 *
 * @param {Function} set - Zustand's set function
 * @param {Function} get - Zustand's get function
 * @param {GlobalStateValues} initialState - Initial state values
 * @returns {AudioState} The audio state slice
 */
export const createAudioSlice = (
  set: (partial: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>)) => void,
  get: () => GlobalState,
  initialState: GlobalStateValues,
): AudioState => {
  /**
   * Initializes the audio system by creating audio context and loading sources
   */
  const initializeAudio = async (): Promise<void> => {
    const audioContext = initializeAudioContext();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1;
    const sourceNode = audioContext.createBufferSource();

    if (STATIC_AUDIO_SOURCES.length === 0) {
      console.error('No static audio sources available');
      return;
    }

    const firstSource = STATIC_AUDIO_SOURCES[0];
    if (!firstSource) {
      console.error('First audio source is undefined');
      return;
    }

    const loadedFirstSource = await loadAudioSource({
      source: firstSource,
      audioContext,
    });

    sourceNode.buffer = loadedFirstSource.audioBuffer;
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    set({
      audioSources: [loadedFirstSource],
      audioPlayer: {
        audioContext,
        sourceNode,
        gainNode,
      },
      downloadedAudioIds: new Set<string>(),
      duration: loadedFirstSource.audioBuffer.duration,
    });

    // Load remaining sources asynchronously
    for (let i = 1; i < STATIC_AUDIO_SOURCES.length; i++) {
      const source = STATIC_AUDIO_SOURCES[i];
      if (!source) continue;

      const state = get();
      const loadedSource = await loadAudioSource({
        source,
        audioContext,
      });
      set({ audioSources: [...state.audioSources, loadedSource] });
    }
  };

  // Initialize audio system when running in browser
  if (typeof window !== 'undefined') {
    // @ts-expect-error only exists for iOS
    if (window.navigator.audioSession) {
      // @ts-expect-error only exists for iOS
      window.navigator.audioSession.type = 'playback';
    }
    initializeAudio();
  }

  return {
    // Include all audio state values from initial state
    ...initialState,

    /**
     * Adds an audio source to the upload history
     *
     * @param {string} name - Name of the audio
     * @param {string} id - ID of the audio
     */
    addToUploadHistory: (name, id) =>
      set((state: GlobalState) => ({
        uploadHistory: [...state.uploadHistory, { name, timestamp: Date.now(), id }],
      })),

    /**
     * Checks if an audio has been downloaded
     *
     * @param {string} id - ID of the audio to check
     * @returns {boolean} Whether the audio has been downloaded
     */
    hasDownloadedAudio: id => {
      const state = get();
      return state.downloadedAudioIds.has(id);
    },

    /**
     * Marks an audio as downloaded
     *
     * @param {string} id - ID of the audio to mark
     */
    markAudioAsDownloaded: id => {
      set((state: GlobalState) => {
        const newSet = new Set(state.downloadedAudioIds);
        newSet.add(id);
        return { downloadedAudioIds: newSet };
      });
    },

    /**
     * Sets all audio sources
     *
     * @param {LocalAudioSource[]} sources - Array of audio sources
     */
    setAudioSources: sources => set({ audioSources: sources }),

    /**
     * Adds a new audio source
     *
     * @param {RawAudioSource} source - Raw audio source to add
     */
    addAudioSource: async (source: RawAudioSource) => {
      const state = get();

      // Check if we already have this audio source
      const existingSourceIndex = state.audioSources.findIndex(s => s.id === source.id);
      if (existingSourceIndex !== -1) return;

      const { audioContext } = state.audioPlayer || {
        audioContext: new AudioContext(),
      };

      try {
        const audioBuffer = await audioContext.decodeAudioData(source.audioBuffer);

        // Mark as downloaded and add to history
        state.markAudioAsDownloaded(source.id);
        state.addToUploadHistory(source.name, source.id);

        const newAudioSource = {
          name: source.name,
          audioBuffer,
          id: source.id,
        };

        set((state: GlobalState) => {
          const shouldUpdateDuration = source.id === state.selectedAudioId;

          return {
            audioSources: [...state.audioSources, newAudioSource],
            ...(shouldUpdateDuration ? { duration: audioBuffer.duration } : {}),
          };
        });
      } catch (error) {
        console.error('Failed to decode audio data:', error);
      }
    },

    /**
     * Sets the selected audio ID and returns whether it was playing
     *
     * @param {string} audioId - ID of the audio to select
     * @returns {boolean} Whether playback was active before changing
     */
    setSelectedAudioId: (audioId: string): boolean => {
      const state = get();
      const wasPlaying = state.isPlaying;

      // Stop any current playback immediately when switching tracks
      if (state.isPlaying && state.audioPlayer) {
        try {
          state.audioPlayer.sourceNode.stop();
        } catch (e) {
          // Ignore errors if already stopped or not initialized
        }
      }

      // Find the new audio source for duration
      const audioIndex = state.findAudioIndexById(audioId);
      let newDuration = 0;
      if (audioIndex !== null) {
        const audioSource = state.audioSources[audioIndex];
        if (audioSource?.audioBuffer) {
          newDuration = audioSource.audioBuffer.duration;
        }
      }

      set({
        selectedAudioId: audioId,
        isPlaying: false,
        currentTime: 0,
        playbackStartTime: 0,
        playbackOffset: 0,
        duration: newDuration,
      });

      return wasPlaying;
    },

    /**
     * Finds the index of an audio by its ID
     *
     * @param {string} audioId - ID of the audio to find
     * @returns {number|null} Index of the audio or null if not found
     */
    findAudioIndexById: (audioId: string): number | null => {
      const state = get();
      const index = state.audioSources.findIndex(source => source.id === audioId);
      return index >= 0 ? index : null;
    },

    /**
     * Schedules playing audio at a specific time
     *
     * @param {Object} data - Play parameters
     * @param {number} data.trackTimeSeconds - Position in the track to start from
     * @param {number} data.targetServerTime - Server time to sync with
     * @param {string} data.audioId - ID of the audio to play
     */
    schedulePlay: data => {
      const state = get();
      if (state.isInitingSystem) {
        return;
      }

      const waitTimeSeconds = getWaitTimeSeconds(state, data.targetServerTime);

      // Update the selected audio ID
      if (data.audioId !== state.selectedAudioId) {
        set({ selectedAudioId: data.audioId });
      }

      // Find the index of the audio to play
      const audioIndex = state.findAudioIndexById(data.audioId);
      if (audioIndex === null) {
        toast.error('Audio file not found. Please reupload the audio file.');
        return;
      }

      state.playAudio({
        offset: data.trackTimeSeconds,
        when: waitTimeSeconds,
        audioIndex,
      });
    },

    /**
     * Schedules pausing audio at a specific time
     *
     * @param {Object} data - Pause parameters
     * @param {number} data.targetServerTime - Server time to sync with
     */
    schedulePause: ({ targetServerTime }) => {
      const state = get();
      const waitTimeSeconds = getWaitTimeSeconds(state, targetServerTime);

      state.pauseAudio({
        when: waitTimeSeconds,
      });
    },

    /**
     * Broadcasts a play command to all clients
     *
     * @param {number} [trackTimeSeconds] - Optional position to start playing from
     */
    broadcastPlay: (trackTimeSeconds?: number) => {
      const state = get();
      const { socket } = getSocket(state);

      if (!state.selectedAudioId) {
        return;
      }

      // Handle null safety for socket
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }

      sendWSRequest({
        ws: socket,
        request: {
          type: ClientActionEnum.enum.PLAY,
          trackTimeSeconds: trackTimeSeconds ?? state.getCurrentTrackPosition(),
          audioId: state.selectedAudioId,
        },
      });
    },

    /**
     * Broadcasts a pause command to all clients
     */
    broadcastPause: () => {
      const state = get();
      const { socket } = getSocket(state);

      // Handle null safety for socket
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }

      sendWSRequest({
        ws: socket,
        request: {
          type: ClientActionEnum.enum.PAUSE,
        },
      });
    },

    /**
     * Plays audio with the specified parameters
     *
     * @param {Object} data - Play parameters
     * @param {number} data.offset - Position in the track to start from
     * @param {number} data.when - When to schedule playback
     * @param {number} [data.audioIndex] - Optional index of the audio to play
     */
    playAudio: async data => {
      const state = get();
      const { sourceNode, audioContext, gainNode } = getAudioPlayer(state);

      // Before any audio playback, ensure the context is running
      if (audioContext.state !== 'running') {
        toast.error('Audio context is suspended. Please try again.');
        return;
      }

      // Stop any existing source node before creating a new one
      try {
        sourceNode.stop();
      } catch (_) {
        // Ignore errors if already stopped
      }

      const startTime = audioContext.currentTime + data.when;
      const audioIndex = data.audioIndex ?? 0;
      const audioSource = state.audioSources[audioIndex];

      if (!audioSource?.audioBuffer) return;

      const audioBuffer = audioSource.audioBuffer;

      // Create a new source node
      const newSourceNode = audioContext.createBufferSource();
      newSourceNode.buffer = audioBuffer;
      newSourceNode.connect(gainNode);

      // Handle track ending naturally
      newSourceNode.onended = () => {
        const currentState = get();
        const { audioPlayer: currentPlayer, isPlaying: currentlyIsPlaying } = currentState;

        if (currentlyIsPlaying && currentPlayer?.sourceNode === newSourceNode) {
          if (!currentPlayer) return;
          const audioContext = currentPlayer.audioContext;

          const expectedEndTime =
            currentState.playbackStartTime + (currentState.duration - currentState.playbackOffset);
          const endedNaturally = Math.abs(audioContext.currentTime - expectedEndTime) < 0.5;

          if (endedNaturally) {
            set({ currentTime: currentState.duration });
            currentState.skipToNextTrack(true);
          }
        }
      };

      newSourceNode.start(startTime, data.offset);

      // Update state with the new source node and tracking info
      set({
        audioPlayer: {
          ...state.audioPlayer!,
          sourceNode: newSourceNode,
        },
        isPlaying: true,
        playbackStartTime: startTime,
        playbackOffset: data.offset,
        duration: audioBuffer.duration || 0,
      });
    },

    /**
     * Pauses audio at the specified time
     *
     * @param {Object} data - Pause parameters
     * @param {number} data.when - When to schedule the pause
     */
    pauseAudio: data => {
      const state = get();
      const { sourceNode, audioContext } = getAudioPlayer(state);

      const stopTime = audioContext.currentTime + data.when;
      sourceNode.stop(stopTime);

      // Calculate current position in the track at the time of pausing
      const elapsedSinceStart = stopTime - state.playbackStartTime;
      const currentTrackPosition = state.playbackOffset + elapsedSinceStart;

      set({
        isPlaying: false,
        currentTime: currentTrackPosition,
      });
    },

    /**
     * Gets the current track position in seconds
     *
     * @returns {number} Current track position in seconds
     */
    getCurrentTrackPosition: () => {
      const state = get();
      const { audioPlayer, isPlaying, currentTime, playbackStartTime, playbackOffset } = state;

      if (!isPlaying || !audioPlayer) {
        return currentTime;
      }

      const { audioContext } = audioPlayer;
      const elapsedSinceStart = audioContext.currentTime - playbackStartTime;
      return Math.min(playbackOffset + elapsedSinceStart, state.duration);
    },

    /**
     * Toggles shuffle mode on/off
     */
    toggleShuffle: () => set((state: GlobalState) => ({ isShuffled: !state.isShuffled })),

    /**
     * Skips to the next track, with optional autoplay behavior
     *
     * @param {boolean} [isAutoplay=false] - Whether this is an automatic skip
     */
    skipToNextTrack: (isAutoplay = false) => {
      const state = get();
      const { audioSources, selectedAudioId, isShuffled } = state;
      if (audioSources.length <= 1) return;

      const currentIndex = state.findAudioIndexById(selectedAudioId);
      if (currentIndex === null) return;

      let nextIndex: number;
      if (isShuffled) {
        do {
          nextIndex = Math.floor(Math.random() * audioSources.length);
        } while (nextIndex === currentIndex);
      } else {
        nextIndex = (currentIndex + 1) % audioSources.length;
      }

      const nextSource = audioSources[nextIndex];
      if (!nextSource) return;

      const nextAudioId = nextSource.id;
      const wasPlayingBeforeSkip = state.setSelectedAudioId(nextAudioId);

      if (wasPlayingBeforeSkip || isAutoplay) {
        state.broadcastPlay(0);
      }
    },

    /**
     * Skips to the previous track
     */
    skipToPreviousTrack: () => {
      const state = get();
      const { audioSources, selectedAudioId } = state;
      if (audioSources.length <= 1) return;

      const currentIndex = state.findAudioIndexById(selectedAudioId);
      if (currentIndex === null) return;

      const prevIndex = (currentIndex - 1 + audioSources.length) % audioSources.length;
      const prevSource = audioSources[prevIndex];
      if (!prevSource) return;

      const prevAudioId = prevSource.id;
      const wasPlayingBeforeSkip = state.setSelectedAudioId(prevAudioId);

      if (wasPlayingBeforeSkip) {
        state.broadcastPlay(0);
      }
    },

    /**
     * Gets the current gain (volume) value
     *
     * @returns {number} Current gain value
     */
    getCurrentGainValue: () => {
      const state = get();
      if (!state.audioPlayer) return 1;
      return state.audioPlayer.gainNode.gain.value;
    },
  };
};
