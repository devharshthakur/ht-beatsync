/**
 * @fileoverview Core type definitions for the global store
 *
 * This file contains shared interfaces and types used across different
 * store slices. It provides the foundation for type safety throughout
 * the application's state management.
 */

/**
 * Maximum number of NTP measurements to collect for clock synchronization
 */
export const MAX_NTP_MEASUREMENTS = 40;

/**
 * Error types for the audio player
 * @enum {string}
 */
export enum AudioPlayerError {
  /** Audio player has not been initialized yet */
  NotInitialized = 'NOT_INITIALIZED',
}

/**
 * Represents a static audio source with basic metadata
 * @interface
 * @property {string} name - Display name of the audio source
 * @property {string} url - URL path to the audio file
 * @property {string} id - Unique identifier for the audio source
 */
export interface StaticAudioSource {
  name: string;
  url: string;
  id: string;
}

/**
 * Represents the state of the Web Audio API audio player
 * @interface
 * @property {AudioContext} audioContext - The Web Audio API context for audio processing
 * @property {AudioBufferSourceNode} sourceNode - The source node that plays the audio buffer
 * @property {GainNode} gainNode - The gain node for volume control
 */
export interface AudioPlayerState {
  audioContext: AudioContext;
  sourceNode: AudioBufferSourceNode;
  gainNode: GainNode;
}

/**
 * Represents a history entry for an uploaded audio file
 * @interface
 * @property {string} name - Display name of the uploaded audio
 * @property {number} timestamp - Timestamp when the upload occurred
 * @property {string} id - Unique identifier for the uploaded audio
 */
export interface UploadHistoryEntry {
  name: string;
  timestamp: number;
  id: string;
}

/**
 * Parameters for scheduling audio playback
 * @interface
 * @property {number} trackTimeSeconds - Position in the track to start playing from (in seconds)
 * @property {number} targetServerTime - Server time to synchronize playback against
 * @property {string} audioId - ID of the audio to play
 */
export interface SchedulePlayParams {
  trackTimeSeconds: number;
  targetServerTime: number;
  audioId: string;
}

/**
 * Parameters for scheduling audio pause
 * @interface
 * @property {number} targetServerTime - Server time to synchronize pause against
 */
export interface SchedulePauseParams {
  targetServerTime: number;
}

/**
 * Parameters for playing audio
 * @interface
 * @property {number} offset - Position in the track to start playing from (in seconds)
 * @property {number} when - When to schedule the playback (in seconds relative to audio context time)
 * @property {number} [audioIndex] - Optional index of the audio to play
 */
export interface PlayAudioParams {
  offset: number;
  when: number;
  audioIndex?: number;
}

/**
 * Parameters for pausing audio
 * @interface
 * @property {number} when - When to schedule the pause (in seconds relative to audio context time)
 */
export interface PauseAudioParams {
  when: number;
}
