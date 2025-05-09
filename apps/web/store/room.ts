/**
 * @fileoverview Room Store Module
 *
 * This module manages the state for room-related interactions in the BeatSync application.
 * It contains a Zustand store with methods to manage room state, including room ID,
 * username, user ID, and loading state.
 *
 * @module RoomStore
 * @category Stores
 */

import { create } from 'zustand';

/**
 * Represents the core values of the room state
 *
 * @typedef {Object} RoomStateValues
 * @property {string} roomId - The unique identifier for the current room
 * @property {string} username - The name of the user in the current room
 * @property {string} userId - The unique identifier for the current user
 * @property {boolean} isLoadingRoom - Indicates whether the room is currently loading
 */
interface RoomStateValues {
  roomId: string;
  username: string;
  userId: string;
  isLoadingRoom: boolean;
}

/**
 * Extended room state interface with setter methods
 *
 * @typedef {Object} RoomState
 * @extends {RoomStateValues}
 * @property {function(string): void} setRoomId - Sets the current room ID
 * @property {function(string): void} setUsername - Sets the current username
 * @property {function(string): void} setUserId - Sets the current user ID
 * @property {function(boolean): void} setIsLoading - Sets the room loading state
 * @property {function(): void} reset - Resets the room state to initial values
 */
interface RoomState extends RoomStateValues {
  setRoomId: (roomId: string) => void;
  setUsername: (username: string) => void;
  setUserId: (userId: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

/**
 * Initial state for the room store
 *
 * @type {RoomStateValues}
 */
const initialState: RoomStateValues = {
  roomId: '',
  username: '',
  userId: '',
  isLoadingRoom: false,
};

/**
 * Creates a Zustand store for managing room-related state
 *
 * @returns {RoomState} A Zustand store with room state and mutation methods
 * @example
 * // Set room ID
 * useRoomStore.getState().setRoomId('room123');
 *
 * // Reset room state
 * useRoomStore.getState().reset();
 */
export const useRoomStore = create<RoomState>()(set => ({
  ...initialState,
  setRoomId: roomId => set({ roomId }),
  setUsername: username => set({ username }),
  setUserId: userId => set({ userId }),
  setIsLoading: isLoading => set({ isLoadingRoom: isLoading }),

  /**
   * Resets the room state, preserving the current username
   * @returns {void}
   */
  reset: (): void =>
    set(state => ({
      ...initialState,
      username: state.username,
    })),
}));
