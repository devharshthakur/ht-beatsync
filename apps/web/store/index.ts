/**
 * @fileoverview Global store entry point
 *
 * This file exports the global store and all related types and utilities.
 * It serves as the main entry point for accessing the application state.
 */

import { create } from 'zustand';
import { GlobalState } from './types/state';
import { createAudioSlice } from './slices/audioSlice';
import { createNetworkSlice } from './slices/networkSlice';
import { createSpatialSlice } from './slices/spatialSlice';
import { createSyncSlice } from './slices/syncSlice';
import { createSystemSlice } from './slices/systemSlice';
import { initialState } from './initialState';

/**
 * Creates a global Zustand store with all feature slices combined
 *
 * @returns {GlobalState} The global store
 */
export const useGlobalStore = create<GlobalState>((set, get) => ({
  // Spread initial state
  ...initialState,

  // Mix in all slice implementations
  ...createAudioSlice(set, get, initialState),
  ...createNetworkSlice(set, get),
  ...createSpatialSlice(set, get),
  ...createSyncSlice(set, get),
  ...createSystemSlice(set, get, initialState),
}));

// Re-export types
export * from './types';
export * from './types/state';
