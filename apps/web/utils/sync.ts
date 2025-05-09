/**
 * @fileoverview Synchronization utility functions
 *
 * This file contains utility functions for timing and synchronization
 * operations, including calculating wait times for synchronized playback.
 */

import { calculateWaitTimeMilliseconds } from '@/utils/ntp';

/**
 * Calculates the wait time in seconds until a target server time
 *
 * @template T - Type with offsetEstimate property
 * @param {T} state - State containing the offset estimate
 * @param {number} targetServerTime - Target server time to synchronize against
 * @returns {number} Wait time in seconds
 */
export const getWaitTimeSeconds = <T extends { offsetEstimate: number }>(
  state: T,
  targetServerTime: number,
): number => {
  const { offsetEstimate } = state;

  const waitTimeMilliseconds = calculateWaitTimeMilliseconds(targetServerTime, offsetEstimate);
  return waitTimeMilliseconds / 1000;
};
