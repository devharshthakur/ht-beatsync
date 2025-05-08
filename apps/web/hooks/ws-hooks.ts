/**
 * @fileoverview React hooks for WebSocket management with clock synchronization
 *
 * This module provides React hooks that simplify working with WebSockets in the
 * BeatSync application. The primary hook (`useWebSocketWithNTP`) combines WebSocket
 * connection management with Network Time Protocol (NTP) clock synchronization.
 *
 * Key features:
 * - Automatic WebSocket connection establishment and maintenance
 * - Built-in NTP clock synchronization
 * - Sophisticated clock offset calculation
 * - Connection state management
 * - Automatic reconnection
 * - Cleanup on unmount
 *
 * This implementation is critical for the BeatSync application where precise timing
 * synchronization between clients is essential for coordinated audio playback.
 * By integrating WebSocket management with clock synchronization, we ensure that
 * all clients share a common time reference.
 *
 * @see ntp.ts For the underlying clock synchronization utilities
 * @see ws.ts For the WebSocket request utilities used by this module
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ClientActionEnum, epochNow } from '@repo/shared';
import { NTPMeasurement, calculateOffsetEstimate } from '../utils/ntp';
import { sendWSRequest } from '../utils/ws';

/**
 * Configuration constants for Network Time Protocol (NTP) synchronization
 *
 * @property {number} MAX_NTP_MEASUREMENTS - Maximum number of NTP measurements to maintain in history (default: 10)
 * @property {number} NTP_REQUEST_INTERVAL - Frequency of sending NTP requests in milliseconds (default: 10 seconds)
 * @property {number} INITIAL_NTP_REQUESTS - Number of initial burst NTP requests (default: 5)
 */
const MAX_NTP_MEASUREMENTS = 10;
const NTP_REQUEST_INTERVAL = 10000; // 10 seconds
const INITIAL_NTP_REQUESTS = 5;

/**
 * Custom hook for managing WebSocket connection with NTP clock synchronization
 *
 * This hook:
 * 1. Establishes and maintains a WebSocket connection
 * 2. Performs periodic NTP requests to synchronize client and server clocks
 * 3. Calculates and maintains the clock offset
 * 4. Handles automatic reconnection
 *
 * @param {string} url - WebSocket server URL
 * @returns {Object} WebSocket state and utilities
 * @returns {WebSocket|null} .ws - The WebSocket connection object
 * @returns {boolean} .isConnected - Whether the WebSocket is connected
 * @returns {number} .clockOffset - Current calculated clock offset (ms)
 * @returns {number} .roundTripDelay - Current network round trip time (ms)
 */
export function useWebSocketWithNTP(url: string): object {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [clockOffset, setClockOffset] = useState(0);
  const [roundTripDelay, setRoundTripDelay] = useState(0);

  // Use refs for values that shouldn't trigger re-renders
  const ntpMeasurementsRef = useRef<NTPMeasurement[]>([]);
  const ntpRequestTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialRequestsCountRef = useRef(0);

  /**
   * Handle an NTP response from the server
   */
  const handleNTPResponse = useCallback((data: { t0: number; t1: number; t2: number }) => {
    const t3 = epochNow(); // Client receive time
    const roundTripDelay = t3 - data.t0 - (data.t2 - data.t1);
    const clockOffset = (data.t1 - data.t0 + (data.t2 - t3)) / 2;

    // Create a new measurement
    const measurement: NTPMeasurement = {
      t0: data.t0,
      t1: data.t1,
      t2: data.t2,
      t3,
      roundTripDelay,
      clockOffset,
    };

    // Add to measurements, keeping only the most recent MAX_NTP_MEASUREMENTS
    ntpMeasurementsRef.current = [...ntpMeasurementsRef.current, measurement].slice(-MAX_NTP_MEASUREMENTS);

    // Calculate a new offset estimate
    if (ntpMeasurementsRef.current.length > 0) {
      const { averageOffset, averageRoundTrip } = calculateOffsetEstimate(ntpMeasurementsRef.current);

      setClockOffset(averageOffset);
      setRoundTripDelay(averageRoundTrip);
    }

    // Continue with initial burst if needed
    if (initialRequestsCountRef.current < INITIAL_NTP_REQUESTS) {
      initialRequestsCountRef.current++;
      scheduleSendNTPRequest(500); // Short delay between initial requests
    }
  }, []);

  /**
   * Schedule the next NTP request
   */
  const scheduleSendNTPRequest = useCallback(
    (delay: number = NTP_REQUEST_INTERVAL) => {
      if (ntpRequestTimeoutRef.current) {
        clearTimeout(ntpRequestTimeoutRef.current);
      }

      ntpRequestTimeoutRef.current = setTimeout(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          // Send NTP request using our utility function
          const t0 = epochNow();
          sendWSRequest({
            ws,
            request: {
              type: ClientActionEnum.enum.NTP_REQUEST,
              t0,
            },
          });
        }
      }, delay);
    },
    [ws],
  );
  /**
   * Initialize and manage WebSocket connection
   *
   * This effect handles the entire lifecycle of the WebSocket connection,
   * including connection, disconnection, error handling, and message processing.
   */
  useEffect(() => {
    const socket = new WebSocket(url);

    /**
     * Handle WebSocket connection open event
     * Marks the connection as established, resets initial request counter,
     * and starts NTP synchronization
     */
    socket.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');

      // Reset initial requests counter
      initialRequestsCountRef.current = 0;

      // Start NTP synchronization immediately
      scheduleSendNTPRequest(0);
    };

    /**
     * Handle WebSocket connection close event
     * Marks the connection as closed and cancels any pending NTP requests
     */
    socket.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');

      // Cancel any pending NTP requests
      if (ntpRequestTimeoutRef.current) {
        clearTimeout(ntpRequestTimeoutRef.current);
        ntpRequestTimeoutRef.current = null;
      }
    };

    /**
     * Handle WebSocket error event
     * Logs any errors that occur during the WebSocket connection
     */
    socket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    /**
     * Handle incoming WebSocket messages
     * Parses the message and processes different message types
     */
    socket.onmessage = event => {
      try {
        const message = JSON.parse(event.data);

        // Handle different message types
        if (message.type === 'NTP_RESPONSE') {
          handleNTPResponse(message.payload);
        }

        // Add additional message type handlers as needed
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    setWs(socket);

    /**
     * Cleanup function for the effect
     * Clears any pending NTP request timeouts and closes the socket
     */
    return () => {
      if (ntpRequestTimeoutRef.current) {
        clearTimeout(ntpRequestTimeoutRef.current);
      }
      socket.close();
    };
  }, [url, handleNTPResponse, scheduleSendNTPRequest]);

  /**
   * Schedule regular NTP requests when the connection is established
   *
   * This effect ensures continuous NTP synchronization while the
   * WebSocket remains connected
   */
  useEffect(() => {
    if (isConnected) {
      scheduleSendNTPRequest();

      /**
       * Cleanup function to clear any pending NTP request timeouts
       */
      return () => {
        if (ntpRequestTimeoutRef.current) {
          clearTimeout(ntpRequestTimeoutRef.current);
        }
      };
    }
  }, [isConnected, scheduleSendNTPRequest]);

  return {
    ws,
    isConnected,
    clockOffset,
    roundTripDelay,
  };
}
