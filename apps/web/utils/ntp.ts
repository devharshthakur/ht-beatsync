/**
 * @fileoverview Network Time Protocol (NTP) utilities for client-server clock synchronization
 *
 * This module provides utilities for implementing a simplified version of NTP (Network Time
 * Protocol) to synchronize client and server clocks. It enables precise timing across
 * distributed clients, which is essential for coordinated audio playback and other
 * time-sensitive operations.
 *
 * Core functionality:
 * - Sending NTP requests to measure client-server clock differences
 * - Calculating clock offset estimates from multiple measurements
 * - Computing optimal wait times based on synchronized clocks
 * - Statistical filtering to improve accuracy
 *
 * The implementation follows a modified version of the NTP algorithm that uses
 * four timestamps to calculate network latency and clock offset:
 *
 * t0: Client send time
 * t1: Server receive time
 * t2: Server send time
 * t3: Client receive time
 *
 * With these timestamps, we can calculate:
 * - Round-trip delay: (t3 - t0) - (t2 - t1)
 * - Clock offset: ((t1 - t0) + (t2 - t3)) / 2
 *
 * @see https://en.wikipedia.org/wiki/Network_Time_Protocol for more on the NTP algorithm
 */

import { ClientActionEnum, epochNow } from '@repo/shared';
import { sendWSRequest } from './ws';

/**
 * Represents a complete Network Time Protocol measurement cycle
 *
 * @interface NTPMeasurement
 * @property {number} t0 - Client send timestamp (ms)
 * @property {number} t1 - Server receive timestamp (ms)
 * @property {number} t2 - Server send timestamp (ms)
 * @property {number} t3 - Client receive timestamp (ms)
 * @property {number} roundTripDelay - Total network round trip time (ms)
 * @property {number} clockOffset - Calculated clock offset between client and server (ms)
 */
export interface NTPMeasurement {
  t0: number;
  t1: number;
  t2: number;
  t3: number;
  roundTripDelay: number;
  clockOffset: number;
}

/**
 * Sends an NTP request to the server to measure clock synchronization
 *
 * Uses the current epoch time as t0 and sends it to the server.
 * The server will respond with t1 (server receive time) and t2 (server send time).
 *
 * @param {WebSocket | null} ws - The WebSocket connection to use
 * @returns {void}
 */
export const sendNTPRequest = (ws: WebSocket | null): void => {
  if (!ws) {
    console.error('Cannot send NTP request: WebSocket is null');
    return;
  }

  if (ws.readyState !== WebSocket.OPEN) {
    console.error('Cannot send NTP request: WebSocket is not open');
    return;
  }

  const t0 = epochNow();
  sendWSRequest({
    ws,
    request: {
      type: ClientActionEnum.enum.NTP_REQUEST,
      t0,
    },
  });
};

/**
 * Calculates an estimated clock offset based on multiple NTP measurements
 *
 * This function:
 * 1. Sorts measurements by round trip delay (lowest first)
 * 2. Takes the best half of measurements (those with lowest delay)
 * 3. Calculates average round trip from all measurements
 * 4. Calculates average offset from best measurements only
 *
 * @param {NTPMeasurement[]} ntpMeasurements - Array of completed NTP measurements
 * @returns {{ averageOffset: number, averageRoundTrip: number }} Calculated clock synchronization statistics
 */
export const calculateOffsetEstimate = (
  ntpMeasurements: NTPMeasurement[],
): {
  averageOffset: number;
  averageRoundTrip: number;
} => {
  // Sort measurements by round trip delay (lowest first)
  const sortedMeasurements = [...ntpMeasurements].sort((a, b) => a.roundTripDelay - b.roundTripDelay);

  // Take the best half of measurements
  const bestMeasurements = sortedMeasurements.slice(0, Math.ceil(sortedMeasurements.length / 2));

  // Calculate average round trip from all measurements
  const totalRoundTrip = ntpMeasurements.reduce((sum, m) => sum + m.roundTripDelay, 0);
  const averageRoundTrip = totalRoundTrip / ntpMeasurements.length;

  // Calculate average offset from best measurements only
  const totalOffset = bestMeasurements.reduce((sum, m) => sum + m.clockOffset, 0);
  const averageOffset = totalOffset / bestMeasurements.length;

  const result = { averageOffset, averageRoundTrip };
  console.log('New clock offset calculated:', result);

  return result;
};

/**
 * Calculates wait time until a specified server time is reached
 *
 * Adjusts the current time using the clock offset to estimate the current
 * server time, then calculates how long to wait until the target time.
 *
 * @param {number} targetServerTime - Target server time in milliseconds since epoch
 * @param {number} clockOffset - Clock offset between client and server in milliseconds
 * @returns {number} Wait time in milliseconds (minimum 0)
 */
export const calculateWaitTimeMilliseconds = (targetServerTime: number, clockOffset: number): number => {
  const estimatedCurrentServerTime = epochNow() + clockOffset;
  return Math.max(0, targetServerTime - estimatedCurrentServerTime);
};

/**
 * Processes an NTP response and calculates round-trip delay and clock offset
 *
 * @param {object} response - The NTP response containing timestamps
 * @param {number} response.t0 - Client send timestamp
 * @param {number} response.t1 - Server receive timestamp
 * @param {number} response.t2 - Server send timestamp
 * @returns {NTPMeasurement} Complete NTP measurement with all timestamps and calculations
 */
export const processNTPResponse = (response: { t0: number; t1: number; t2: number }): NTPMeasurement => {
  const t3 = epochNow();
  const { t0, t1, t2 } = response;

  // Calculate round-trip delay and clock offset
  const clockOffset = (t1 - t0 + (t2 - t3)) / 2;
  const roundTripDelay = t3 - t0 - (t2 - t1);

  return {
    t0,
    t1,
    t2,
    t3,
    roundTripDelay,
    clockOffset,
  };
};
