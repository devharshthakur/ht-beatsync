/**
 * @fileoverview System slice for the global store
 *
 * This file contains system-related state and methods for the
 * global store. It manages initialization and reset functionality.
 */

import { GlobalState, GlobalStateValues, SystemState } from '../types/state';

/**
 * Creates the system slice of the store
 *
 * @param {Function} set - Zustand's set function
 * @param {Function} get - Zustand's get function
 * @param {GlobalStateValues} initialState - The initial state values
 * @returns {SystemState} The system state slice
 */
export const createSystemSlice = (
  set: (partial: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>)) => void,
  get: () => GlobalState,
  initialState: GlobalStateValues,
): SystemState => {
  return {
    // Initial value
    isInitingSystem: initialState.isInitingSystem,

    /**
     * Sets whether the system is being initialized
     *
     * @param {boolean} isIniting - Whether the system is initializing
     */
    setIsInitingSystem: async (isIniting: boolean) => {
      // Update the initialization state
      set({ isInitingSystem: isIniting });
    },

    /**
     * Resets the entire store to initial state
     * Closes existing resources and reinitializes the system
     */
    resetStore: () => {
      const state = get();

      // Close the websocket connection if it exists
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.close();
      }

      // Reset state to initial values
      set(initialState);
    },
  };
};
