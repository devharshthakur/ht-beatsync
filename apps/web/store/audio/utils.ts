/**
 * @fileoverview Audio utility functions
 *
 * This file contains utility functions for audio operations including
 * loading audio sources, initializing the audio context, and other audio-related
 * helper functions used by the audio store.
 */

import { AudioPlayerError, StaticAudioSource } from '../types';
import { LocalAudioSource } from '@/lib/localTypes';

/**
 * Initializes a new Web Audio API context
 *
 * @returns {AudioContext} A new AudioContext instance
 */
export const initializeAudioContext = (): AudioContext => {
  return new AudioContext();
};

/**
 * Gets the audio player from the state, throwing an error if not initialized
 *
 * @template T - Type with an audioPlayer property
 * @param {T} state - State object containing the audioPlayer
 * @returns The audio player from the state
 * @throws {Error} If the audio player is not initialized
 */
export const getAudioPlayer = <T extends { audioPlayer: any | null }>(state: T) => {
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
