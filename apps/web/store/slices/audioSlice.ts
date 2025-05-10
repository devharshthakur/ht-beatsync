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
  const initializeAudio = async () => {
    console.log('initializeAudio()');
    // Create fresh audio context
    const audioContext = initializeAudioContext();

    // Create master gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1; // Default volume
    const sourceNode = audioContext.createBufferSource();

    // Check if we have any audio sources
    if (STATIC_AUDIO_SOURCES.length === 0) {
      console.error('No static audio sources available');
      return;
    }

    // Get first source safely
    const firstSource = STATIC_AUDIO_SOURCES[0];
    if (!firstSource) {
      console.error('First audio source is undefined');
      return;
    }

    // Load first source
    const loadedFirstSource = await loadAudioSource({
      source: firstSource,
      audioContext,
    });

    // Decode initial first audio source
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
    console.log(`${0} Decoded source ${loadedFirstSource.name}`);

    // Load rest asynchronously, keep updating state
    for (let i = 1; i < STATIC_AUDIO_SOURCES.length; i++) {
      const source = STATIC_AUDIO_SOURCES[i];
      if (!source) continue; // Skip if source is undefined

      const state = get();
      const loadedSource = await loadAudioSource({
        source,
        audioContext,
      });
      set({ audioSources: [...state.audioSources, loadedSource] });
      console.log(`${i} Decoded source ${loadedSource.name}`);
    }
  };

  // Initialize audio system when running in browser
  if (typeof window !== 'undefined') {
    // @ts-expect-error only exists for iOS
    if (window.navigator.audioSession) {
      // @ts-expect-error only exists for iOS
      window.navigator.audioSession.type = 'playback';
    }

    console.log('Detected that no audio sources were loaded, initializing');
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
      const { audioContext } = state.audioPlayer || {
        audioContext: new AudioContext(),
      };

      try {
        const audioBuffer = await audioContext.decodeAudioData(source.audioBuffer);
        console.log('Decoded audio setting state to add audio source', source.name);

        /* 
        Add to upload history 
        and mark as downloaded if the audio source has an ID 
        */
        state.markAudioAsDownloaded(source.id);
        state.addToUploadHistory(source.name, source.id);

        const newAudioSource = {
          name: source.name,
          audioBuffer,
          id: source.id,
        };

        set((state: GlobalState) => {
          // If this is the currently selected audio, update the duration
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
      const wasPlaying = state.isPlaying; // Store if it was playing *before* stopping

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

      // Reset timing state and update selected ID
      set({
        selectedAudioId: audioId,
        isPlaying: false, // Always stop playback on track change before potentially restarting
        currentTime: 0,
        playbackStartTime: 0,
        playbackOffset: 0,
        duration: newDuration,
      });

      // Return the previous playing state for the skip functions to use
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
      // Look through the audioSources for a matching ID
      const index = state.audioSources.findIndex(source => source.id === audioId);
      return index >= 0 ? index : null; // Return null if not found
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
        console.log('Not playing audio, still loading');
        // Non-interactive state, can't play audio
        return;
      }

      const waitTimeSeconds = getWaitTimeSeconds(state, data.targetServerTime);
      console.log(`Playing track ${data.audioId} at ${data.trackTimeSeconds} seconds in ${waitTimeSeconds}`);

      // Update the selected audio ID
      if (data.audioId !== state.selectedAudioId) {
        set({ selectedAudioId: data.audioId });
      }

      // Find the index of the audio to play
      const audioIndex = state.findAudioIndexById(data.audioId);
      if (audioIndex === null) {
        console.error(`Cannot play audio: No index found: ${data.audioId} ${data.trackTimeSeconds}`);
        toast.error('Audio file not found. Please reupload the audio file.');
        return;
      }

      state.playAudio({
        offset: data.trackTimeSeconds,
        when: waitTimeSeconds,
        audioIndex, // Pass the found index for actual playback
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
      console.log(`Pausing track in ${waitTimeSeconds}`);

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

      // Make sure we have a selected audio ID
      if (!state.selectedAudioId) {
        console.error('Cannot broadcast play: No audio selected');
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
        console.log('AudioContext still suspended, aborting play');
        toast.error('Audio context is suspended. Please try again.');
        return;
      }

      // Stop any existing source node before creating a new one
      try {
        sourceNode.stop();
      } catch (_) {}

      const startTime = audioContext.currentTime + data.when;
      const audioIndex = data.audioIndex ?? 0;
      const audioSource = state.audioSources[audioIndex];

      // Safety check for audioSource
      if (!audioSource || !audioSource.audioBuffer) {
        console.error(`No audio source or buffer found at index ${audioIndex}`);
        return;
      }

      const audioBuffer = audioSource.audioBuffer;

      // Create a new source node
      const newSourceNode = audioContext.createBufferSource();
      newSourceNode.buffer = audioBuffer;
      newSourceNode.connect(gainNode);

      // Autoplay: Handle track ending naturally
      newSourceNode.onended = () => {
        const currentState = get();
        const { audioPlayer: currentPlayer, isPlaying: currentlyIsPlaying } = currentState; // Get fresh state

        /**
         * Only process if the player was 'isPlaying' right before this event fired
         * and the sourceNode that ended is the *current* sourceNode.
         * This prevents handlers from old nodes interfering after a quick skip.
         */
        if (currentlyIsPlaying && currentPlayer?.sourceNode === newSourceNode) {
          // Safely access audioContext
          if (!currentPlayer) return;
          const audioContext = currentPlayer.audioContext;

          /**
           * Check if the buffer naturally reached its end
           * Calculate the expected end time in the AudioContext timeline
           */
          const expectedEndTime =
            currentState.playbackStartTime + (currentState.duration - currentState.playbackOffset);
          // Use a tolerance for timing discrepancies (e.g., 0.5 seconds)
          const endedNaturally = Math.abs(audioContext.currentTime - expectedEndTime) < 0.5;

          if (endedNaturally) {
            console.log('Track ended naturally, skipping to next via autoplay.');
            /**
             Set currentTime to duration, as playback fully completed
             We don't set isPlaying false here, let skipToNextTrack handle state transition
             */
            set({ currentTime: currentState.duration });
            currentState.skipToNextTrack(true); // Trigger autoplay skip
          } else {
            console.log(
              'onended fired but not deemed a natural end (likely manual stop/skip). State should be handled elsewhere.',
            );
            /**
             * If stopped manually (pauseAudio) or skipped (setSelectedAudioId),
             * those functions are responsible for setting isPlaying = false and currentTime.
             * No action needed here for non-natural ends.
             */
          }
        } else {
          console.log('onended fired but player was already stopped/paused or source node changed.');
        }
      };

      newSourceNode.start(startTime, data.offset);
      console.log('Started playback at offset:', data.offset, 'with delay:', data.when, 'audio index:', audioIndex);

      // Update state with the new source node and tracking info
      set((state: GlobalState) => ({
        ...state,
        audioPlayer: {
          ...state.audioPlayer!,
          sourceNode: newSourceNode,
        },
        isPlaying: true,
        playbackStartTime: startTime,
        playbackOffset: data.offset,
        duration: audioBuffer.duration || 0, // Set the duration
      }));
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

      console.log('Stopping at:', data.when, 'Current track position:', currentTrackPosition);

      set((state: GlobalState) => ({
        ...state,
        isPlaying: false,
        currentTime: currentTrackPosition,
      }));
    },

    /**
     * Gets the current track position in seconds
     *
     * @returns {number} Current track position in seconds
     */
    getCurrentTrackPosition: () => {
      const state = get();
      const { audioPlayer, isPlaying, currentTime, playbackStartTime, playbackOffset } = state; // Destructure for easier access

      if (!isPlaying || !audioPlayer) {
        return currentTime; // Return the saved position when paused or not initialized
      }

      const { audioContext } = audioPlayer;
      const elapsedSinceStart = audioContext.currentTime - playbackStartTime;
      // Ensure position doesn't exceed duration due to timing glitches
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
      // Accept optional isAutoplay flag
      const state = get();
      const { audioSources, selectedAudioId, isShuffled } = state;
      if (audioSources.length <= 1) return; // Can't skip if only one track

      const currentIndex = state.findAudioIndexById(selectedAudioId);
      if (currentIndex === null) return;

      let nextIndex: number;
      if (isShuffled) {
        // Shuffle logic: pick a random index DIFFERENT from the current one
        do {
          nextIndex = Math.floor(Math.random() * audioSources.length);
        } while (nextIndex === currentIndex);
      } else {
        // Normal sequential logic
        nextIndex = (currentIndex + 1) % audioSources.length;
      }

      const nextSource = audioSources[nextIndex];
      if (!nextSource) {
        console.error(`No audio source found at index ${nextIndex}`);
        return;
      }

      const nextAudioId = nextSource.id;
      /**
       * Sets the selected audio ID and stops any current playback, setting isPlaying to false.
       *
       * @returns {boolean} Whether playback was active before this function was called.
       */
      const wasPlayingBeforeSkip: boolean = state.setSelectedAudioId(nextAudioId);

      /**
       * If the track was playing before a manual skip or if this is an autoplay event,
       * starts playing the next track from the beginning.
       */
      if (wasPlayingBeforeSkip || isAutoplay) {
        console.log(
          `Skip to next: ${nextAudioId}. Was playing: ${wasPlayingBeforeSkip}, Is autoplay: ${isAutoplay}. Broadcasting play.`,
        );
        state.broadcastPlay(0); // Play next track from start
      } else {
        console.log(
          `Skip to next: ${nextAudioId}. Was playing: ${wasPlayingBeforeSkip}, Is autoplay: ${isAutoplay}. Not broadcasting play.`,
        );
      }
    },

    /**
     * Skips to the previous track
     */
    skipToPreviousTrack: () => {
      const state = get();
      const { audioSources, selectedAudioId } = state;
      if (audioSources.length === 0) return;

      const currentIndex = state.findAudioIndexById(selectedAudioId);
      if (currentIndex === null) return;

      // Previous track always goes to the actual previous in the list, even if shuffled
      // This is a common behavior, but could be changed if needed.
      const prevIndex = (currentIndex - 1 + audioSources.length) % audioSources.length;
      const prevSource = audioSources[prevIndex];

      if (!prevSource) {
        console.error(`No audio source found at index ${prevIndex}`);
        return;
      }

      const prevAudioId = prevSource.id;

      // setSelectedAudioId stops any current playback and sets isPlaying to false.
      // It returns true if playback was active *before* this function was called.
      const wasPlayingBeforeSkip = state.setSelectedAudioId(prevAudioId);

      // If the track was playing before the manual skip, start playing the previous track.
      if (wasPlayingBeforeSkip) {
        console.log(`Skip to previous: ${prevAudioId}. Was playing: ${wasPlayingBeforeSkip}. Broadcasting play.`);
        state.broadcastPlay(0); // Play previous track from start
      } else {
        console.log(`Skip to previous: ${prevAudioId}. Was playing: ${wasPlayingBeforeSkip}. Not broadcasting play.`);
      }
    },

    /**
     * Gets the current gain (volume) value
     *
     * @returns {number} Current gain value
     */
    getCurrentGainValue: () => {
      const state = get();
      if (!state.audioPlayer) return 1; // Default value if no player
      return state.audioPlayer.gainNode.gain.value;
    },
  };
};
