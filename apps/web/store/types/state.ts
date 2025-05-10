/**
 * @fileoverview State interfaces for the global store
 *
 * This file contains the state interfaces for each slice of the global store
 * as well as the combined global state interface.
 */

import { LocalAudioSource, RawAudioSource } from '@/lib/localTypes';
import { NTPMeasurement } from '@/utils/ntp';
import { ClientType, PositionType, SpatialConfigType } from '@repo/shared';
import {
  AudioPlayerState,
  PlayAudioParams,
  PauseAudioParams,
  SchedulePlayParams,
  SchedulePauseParams,
  UploadHistoryEntry,
} from './index';

/**
 * Core audio state values without methods
 * @interface
 * @property {LocalAudioSource[]} audioSources - List of available audio sources
 * @property {string} selectedAudioId - ID of the currently selected audio
 * @property {UploadHistoryEntry[]} uploadHistory - History of uploaded audio files
 * @property {Set<string>} downloadedAudioIds - Set of audio IDs that have been downloaded
 * @property {AudioPlayerState | null} audioPlayer - Audio player instance
 * @property {boolean} isPlaying - Whether audio is currently playing
 * @property {number} currentTime - Current playback position in seconds
 * @property {number} duration - Total duration of the current track in seconds
 * @property {number} volume - Volume level (0-1)
 * @property {number} playbackStartTime - AudioContext time when playback started
 * @property {number} playbackOffset - Offset in the track where playback started
 * @property {boolean} isShuffled - Whether tracks should play in random order
 */
export interface AudioStateValues {
  audioSources: LocalAudioSource[];
  selectedAudioId: string;
  uploadHistory: UploadHistoryEntry[];
  downloadedAudioIds: Set<string>;
  audioPlayer: AudioPlayerState | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackStartTime: number;
  playbackOffset: number;
  isShuffled: boolean;
}

/**
 * Audio state with methods for audio operations
 * @interface
 * @extends {AudioStateValues}
 * @property {(name: string, id: string) => void} addToUploadHistory - Add an audio source to history
 * @property {(id: string) => boolean} hasDownloadedAudio - Check if audio has been downloaded
 * @property {(id: string) => void} markAudioAsDownloaded - Mark audio as downloaded
 * @property {(sources: LocalAudioSource[]) => void} setAudioSources - Set all audio sources
 * @property {(source: RawAudioSource) => Promise<void>} addAudioSource - Add a new audio source
 * @property {(audioId: string) => boolean} setSelectedAudioId - Set the selected audio ID
 * @property {(audioId: string) => number | null} findAudioIndexById - Find the index of an audio by ID
 * @property {(data: SchedulePlayParams) => void} schedulePlay - Schedule playing audio at a specific time
 * @property {(data: SchedulePauseParams) => void} schedulePause - Schedule pausing audio at a specific time
 * @property {(trackTimeSeconds?: number) => void} broadcastPlay - Broadcast a play command to all clients
 * @property {() => void} broadcastPause - Broadcast a pause command to all clients
 * @property {(data: PlayAudioParams) => void} playAudio - Play audio with specified parameters
 * @property {(data: PauseAudioParams) => void} pauseAudio - Pause audio at a specific time
 * @property {() => number} getCurrentTrackPosition - Get the current position in the track
 * @property {() => void} toggleShuffle - Toggle shuffle mode on/off
 * @property {(isAutoplay?: boolean) => void} skipToNextTrack - Skip to the next track
 * @property {() => void} skipToPreviousTrack - Skip to the previous track
 * @property {() => number} getCurrentGainValue - Get the current gain value
 */

export interface AudioState extends AudioStateValues {
  addToUploadHistory: (name: string, id: string) => void;
  hasDownloadedAudio: (id: string) => boolean;
  markAudioAsDownloaded: (id: string) => void;
  setAudioSources: (sources: LocalAudioSource[]) => void;
  addAudioSource: (source: RawAudioSource) => Promise<void>;
  setSelectedAudioId: (audioId: string) => boolean;
  findAudioIndexById: (audioId: string) => number | null;
  schedulePlay: (data: SchedulePlayParams) => void;
  schedulePause: (data: SchedulePauseParams) => void;
  broadcastPlay: (trackTimeSeconds?: number) => void;
  broadcastPause: () => void;
  playAudio: (data: PlayAudioParams) => void;
  pauseAudio: (data: PauseAudioParams) => void;
  getCurrentTrackPosition: () => number;
  toggleShuffle: () => void;
  skipToNextTrack: (isAutoplay?: boolean) => void;
  skipToPreviousTrack: () => void;
  getCurrentGainValue: () => number;
}

/**
 * Core network state values without methods
 * @interface
 * @property {WebSocket | null} socket - WebSocket connection
 * @property {ClientType[]} connectedClients - Connected clients in the room
 */
export interface NetworkStateValues {
  socket: WebSocket | null;
  connectedClients: ClientType[];
}

/**
 * Network state with methods for network operations
 * @interface
 * @extends {NetworkStateValues}
 * @property {(socket: WebSocket) => void} setSocket - Set the WebSocket connection
 * @property {(clients: ClientType[]) => void} setConnectedClients - Set the list of connected clients
 * @property {(audioId: string, audioName: string) => void} reuploadAudio - Request to reupload an audio file
 * @property {(clientId: string) => void} reorderClient - Request to reorder a client in the spatial view
 */
export interface NetworkState extends NetworkStateValues {
  setSocket: (socket: WebSocket) => void;
  setConnectedClients: (clients: ClientType[]) => void;
  reuploadAudio: (audioId: string, audioName: string) => void;
  reorderClient: (clientId: string) => void;
}

/**
 * Core sync state values without methods
 * @interface
 * @property {NTPMeasurement[]} ntpMeasurements - List of NTP measurements for clock synchronization
 * @property {number} offsetEstimate - Estimated time offset between client and server
 * @property {number} roundTripEstimate - Estimated round trip time for network communication
 * @property {boolean} isSynced - Whether the client is synced with the server
 */
export interface SyncStateValues {
  ntpMeasurements: NTPMeasurement[];
  offsetEstimate: number;
  roundTripEstimate: number;
  isSynced: boolean;
}

/**
 * Sync state with methods for synchronization operations
 * @interface
 * @extends {SyncStateValues}
 * @property {() => void} sendNTPRequest - Send an NTP request to the server
 * @property {() => void} resetNTPConfig - Reset the NTP configuration
 * @property {(measurement: NTPMeasurement) => void} addNTPMeasurement - Add an NTP measurement to the collection
 */
export interface SyncState extends SyncStateValues {
  sendNTPRequest: () => void;
  resetNTPConfig: () => void;
  addNTPMeasurement: (measurement: NTPMeasurement) => void;
}

/**
 * Core spatial audio state values without methods
 * @interface
 * @property {SpatialConfigType} [spatialConfig] - Spatial audio configuration
 * @property {PositionType} listeningSourcePosition - Position of the listening source
 * @property {boolean} isDraggingListeningSource - Whether the user is dragging the listening source
 * @property {boolean} isSpatialAudioEnabled - Whether spatial audio is enabled
 */
export interface SpatialStateValues {
  spatialConfig?: SpatialConfigType;
  listeningSourcePosition: PositionType;
  isDraggingListeningSource: boolean;
  isSpatialAudioEnabled: boolean;
}

/**
 * Spatial audio state with methods for spatial operations
 * @interface
 * @extends {SpatialStateValues}
 * @property {() => void} startSpatialAudio - Start spatial audio mode
 * @property {() => void} sendStopSpatialAudio - Send a request to stop spatial audio
 * @property {(config: SpatialConfigType) => void} setSpatialConfig - Set the spatial configuration
 * @property {(position: PositionType) => void} updateListeningSource - Update the listening source position and broadcast
 * @property {(position: PositionType) => void} setListeningSourcePosition - Set the listening source position without broadcasting
 * @property {(isDragging: boolean) => void} setIsDraggingListeningSource - Set whether the user is dragging the listening source
 * @property {(isEnabled: boolean) => void} setIsSpatialAudioEnabled - Set whether spatial audio is enabled
 * @property {() => void} processStopSpatialAudio - Process stop spatial audio command
 * @property {(config: SpatialConfigType) => void} processSpatialConfig - Process a spatial configuration update
 */
export interface SpatialState extends SpatialStateValues {
  startSpatialAudio: () => void;
  sendStopSpatialAudio: () => void;
  setSpatialConfig: (config: SpatialConfigType) => void;
  updateListeningSource: (position: PositionType) => void;
  setListeningSourcePosition: (position: PositionType) => void;
  setIsDraggingListeningSource: (isDragging: boolean) => void;
  setIsSpatialAudioEnabled: (isEnabled: boolean) => void;
  processStopSpatialAudio: () => void;
  processSpatialConfig: (config: SpatialConfigType) => void;
}

/**
 * System state values without methods
 * @interface
 * @property {boolean} isInitingSystem - Whether the system is being initialized
 */
export interface SystemStateValues {
  isInitingSystem: boolean;
}

/**
 * System state with methods for system operations
 * @interface
 * @extends {SystemStateValues}
 * @property {(isIniting: boolean) => void} setIsInitingSystem - Set whether the system is being initialized
 * @property {() => void} resetStore - Reset the entire store to initial state
 */
export interface SystemState extends SystemStateValues {
  setIsInitingSystem: (isIniting: boolean) => void;
  resetStore: () => void;
}

/**
 * Combined global state values
 * @interface
 * @extends {AudioStateValues}
 * @extends {NetworkStateValues}
 * @extends {SyncStateValues}
 * @extends {SpatialStateValues}
 * @extends {SystemStateValues}
 */
export interface GlobalStateValues
  extends AudioStateValues,
    NetworkStateValues,
    SyncStateValues,
    SpatialStateValues,
    SystemStateValues {}

/**
 * Complete global state with all methods
 * @interface
 */
export interface GlobalState extends AudioState, NetworkState, SyncState, SpatialState, SystemState {}
