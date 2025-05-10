/**
 * @fileoverview Initial state for the global store
 *
 * This file defines the initial state values for all store slices.
 * These values are used when the store is first created or reset.
 */

import { GlobalStateValues } from './types/state';
import { STATIC_AUDIO_SOURCES } from './audio/constants';
import { GRID } from '@repo/shared';

// Default audio ID for initial state if no static sources are available
const DEFAULT_AUDIO_ID = 'static-0';

/**
 * Initial global state values for the store
 *
 * @type {GlobalStateValues}
 */
export const initialState: GlobalStateValues = {
  // Audio playback state
  audioSources: [],
  isPlaying: false,
  currentTime: 0,
  playbackStartTime: 0,
  playbackOffset: 0,
  selectedAudioId: STATIC_AUDIO_SOURCES[0]?.id || DEFAULT_AUDIO_ID,
  duration: 0,
  volume: 0.5,
  audioPlayer: null,
  uploadHistory: [],
  downloadedAudioIds: new Set<string>(),
  isShuffled: false,

  // Spatial audio
  isSpatialAudioEnabled: false,
  isDraggingListeningSource: false,
  listeningSourcePosition: { x: GRID.SIZE / 2, y: GRID.SIZE / 2 },
  spatialConfig: undefined,

  // Network state
  socket: null,
  connectedClients: [],

  // NTP state
  ntpMeasurements: [],
  offsetEstimate: 0,
  roundTripEstimate: 0,
  isSynced: false,

  // System state
  isInitingSystem: true,
};
