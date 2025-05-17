/**
 * @fileoverview Types for default audio handling
 *
 * This file contains type definitions related to the default audio tracks
 * that come with the application (from the public/songs directory).
 */

export interface DefaultTrack {
  id: string;
  title: string;
  artist: string;
  path: string;
  fileName: string;
  duration?: number;
}

export interface DefaultAudioPlayerState {
  tracks: DefaultTrack[];
  currentTrackId: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  isShuffle: boolean;
  isLoaded: boolean;
  audioContext: AudioContext | null;
  gainNode: GainNode | null;
  sourceNode: AudioBufferSourceNode | null;
}

/**
 * Interface for a loaded audio track with its buffer
 */
export interface LoadedTrack extends DefaultTrack {
  buffer: AudioBuffer; // Decoded audio data
}
