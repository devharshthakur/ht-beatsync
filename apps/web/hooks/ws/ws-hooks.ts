/**
 * React hooks for WebSocket management with clock synchronization
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ClientActionEnum, epochNow } from '@repo/shared';
import { NTPMeasurement, calculateOffsetEstimate, processNTPResponse } from '../utils/ntp';
import { sendWSRequest } from '../utils/ws';

// Configuration constants for NTP synchronization
const MAX_NTP_MEASUREMENTS = 10;
const NTP_REQUEST_INTERVAL = 10000; // 10 seconds
const INITIAL_NTP_REQUESTS = 5;

// Type for NTP response payload
interface NTPResponsePayload {
  t0: number;
  t1: number;
  t2: number;
}

// Type for parsed WebSocket messages
interface WebSocketMessage {
  type: string;
  payload: any;
}

// Return type for the useWebSocketWithNTP hook
export interface WebSocketWithNTPResult {
  ws: WebSocket | null;
  isConnected: boolean;
  clockOffset: number;
  roundTripDelay: number;
}

/**
 * Custom hook for managing WebSocket connection with NTP clock synchronization
 */
export function useWebSocketWithNTP(url: string): WebSocketWithNTPResult {
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
  const handleNTPResponse = useCallback((data: NTPResponsePayload) => {
    const measurement = processNTPResponse(data);
    ntpMeasurementsRef.current = [...ntpMeasurementsRef.current, measurement].slice(-MAX_NTP_MEASUREMENTS);

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
    (delay = NTP_REQUEST_INTERVAL): void => {
      if (ntpRequestTimeoutRef.current) {
        clearTimeout(ntpRequestTimeoutRef.current);
      }

      ntpRequestTimeoutRef.current = setTimeout(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
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
   */
  useEffect(() => {
    if (!url) return;

    const socket = new WebSocket(url);

    socket.onopen = (): void => {
      setIsConnected(true);
      initialRequestsCountRef.current = 0;
      scheduleSendNTPRequest(0); // Start NTP synchronization immediately
    };

    socket.onclose = (): void => {
      setIsConnected(false);
      clearNTPTimeout();
    };

    socket.onmessage = (event: MessageEvent): void => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;

        if (message.type === 'NTP_RESPONSE') {
          handleNTPResponse(message.payload);
        }
        // Handler can be expanded for other message types
      } catch (error) {
        // Silent error for parsing issues
      }
    };

    setWs(socket);

    // Cleanup function
    return () => {
      clearNTPTimeout();
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, [url, handleNTPResponse, scheduleSendNTPRequest]);

  /**
   * Schedule regular NTP requests when the connection is established
   */
  useEffect(() => {
    if (isConnected) {
      scheduleSendNTPRequest();
      return clearNTPTimeout;
    }
  }, [isConnected, scheduleSendNTPRequest]);

  /**
   * Helper function to clear NTP timeout
   */
  const clearNTPTimeout = useCallback((): void => {
    if (ntpRequestTimeoutRef.current) {
      clearTimeout(ntpRequestTimeoutRef.current);
      ntpRequestTimeoutRef.current = null;
    }
  }, []);

  return {
    ws,
    isConnected,
    clockOffset,
    roundTripDelay,
  };
}
