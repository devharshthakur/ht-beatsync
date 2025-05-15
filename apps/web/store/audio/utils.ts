/**
 * @fileoverview Audio utility functions
 *
 * This file contains utility functions for audio operations including
 * loading audio sources, initializing the audio context, and other audio-related
 * helper functions used by the audio store.
 */

import { AudioPlayerError, StaticAudioSource, AudioPlayerState } from '../types';
import { LocalAudioSource } from '@/lib/localTypes';

// Add proper declaration for webkitAudioContext via global augmentation
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

/**
 * Initializes a new Web Audio API context
 * Modern browsers require user interaction to start audio
 *
 * @returns {AudioContext} A new AudioContext instance
 */
export const initializeAudioContext = (): AudioContext => {
  // Create a new context with the correct options
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContextClass({
    latencyHint: 'interactive',
    sampleRate: 48000,
  });

  // Log the initial state
  console.log(`AudioContext initialized with state: ${context.state}`);

  return context;
};

/**
 * Gets the audio player from the state, throwing an error if not initialized
 *
 * @template T - Type with an audioPlayer property
 * @param {T} state - State object containing the audioPlayer
 * @returns The audio player from the state
 * @throws {Error} If the audio player is not initialized
 */
export const getAudioPlayer = <T extends { audioPlayer: AudioPlayerState | null }>(state: T) => {
  if (!state.audioPlayer) {
    throw new Error(AudioPlayerError.NotInitialized);
  }
  return state.audioPlayer;
};

/**
 * Loads an audio file from a URL and decodes it into an audio buffer
 *
 * @param {Object} options - Options for loading the audio source
 * @param {StaticAudioSource} options.source - The static audio source to load
 * @param {AudioContext} options.audioContext - The audio context to use for decoding
 * @returns {Promise<LocalAudioSource>} A promise that resolves to the loaded audio source
 */
export const loadAudioSource = async ({
  source,
  audioContext,
}: {
  source: StaticAudioSource;
  audioContext: AudioContext;
}): Promise<LocalAudioSource> => {
  const response = await fetch(source.url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  return {
    name: source.name,
    audioBuffer,
    id: source.id,
  };
};
