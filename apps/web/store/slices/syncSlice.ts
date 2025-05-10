/**
 * @fileoverview Synchronization slice for the global store
 *
 * This file contains the synchronization-related state and methods for the
 * global store. It manages NTP measurements and time synchronization.
 */

import { StateCreator } from 'zustand';
import { toast } from 'sonner';
import { sendNTPRequest, calculateOffsetEstimate } from '@/utils/ntp';
import { GlobalState, SyncState } from '../types/state';
import { MAX_NTP_MEASUREMENTS } from '../types';
import { getSocket } from '../network/utils';

/**
 * Creates the synchronization slice of the store
 *
 * @param {Function} set - Zustand's set function
 * @param {Function} get - Zustand's get function
 * @returns {SyncState} The synchronization state slice
 */
export const createSyncSlice = (
  set: (partial: Partial<GlobalState> | ((state: GlobalState) => Partial<GlobalState>)) => void,
  get: () => GlobalState,
): SyncState => {
  return {
    // Initial values
    ntpMeasurements: [],
    offsetEstimate: 0,
    roundTripEstimate: 0,
    isSynced: false,

    /**
     * Sends an NTP request to the server for time synchronization
     * If enough measurements are collected, calculates the offset estimate
     */
    sendNTPRequest: () => {
      const state = get();
      if (state.ntpMeasurements.length >= MAX_NTP_MEASUREMENTS) {
        const { averageOffset, averageRoundTrip } = calculateOffsetEstimate(state.ntpMeasurements);
        set({
          offsetEstimate: averageOffset,
          roundTripEstimate: averageRoundTrip,
          isSynced: true,
        });

        if (averageRoundTrip > 750) {
          toast.error('Latency is very high (>750ms). Sync may be unstable.');
        }

        return;
      }

      // Otherwise not done, keep sending
      const { socket } = getSocket(state);

      // Send the request
      sendNTPRequest(socket);
    },

    /**
     * Resets the NTP configuration to initial values
     */
    resetNTPConfig() {
      set({
        ntpMeasurements: [],
        offsetEstimate: 0,
        roundTripEstimate: 0,
        isSynced: false,
      });
    },

    /**
     * Adds an NTP measurement to the collection
     *
     * @param {NTPMeasurement} measurement - The NTP measurement to add
     */
    addNTPMeasurement: measurement =>
      set((state: GlobalState) => ({
        ntpMeasurements: [...state.ntpMeasurements, measurement],
      })),
  };
};
