/**
 * @fileoverview Local type definitions for audio sources
 *
 * This file contains interfaces for audio sources used in the application.
 * These types define the structure of audio data both before and after processing.
 */

/**
 * Represents a processed audio source ready for playback
 * @interface
 * @property {string} name - Display name of the audio source
 * @property {AudioBuffer} audioBuffer - Decoded audio buffer ready for playback
 * @property {string} id - Unique identifier for tracking and reference
 */
export interface LocalAudioSource {
  name: string;
  audioBuffer: AudioBuffer;
  id: string;
}

/**
 * Represents a raw audio source before processing
 * @interface
 * @property {string} name - Display name of the audio source
 * @property {ArrayBuffer} audioBuffer - Raw audio data buffer before decoding
 * @property {string} id - Optional Unique identifier for tracking and reference
 */
export interface RawAudioSource {
  name: string;
  audioBuffer: ArrayBuffer;
  id: string;
}
