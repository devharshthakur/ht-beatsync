/**
 * @fileOverview This module defines the WebSocket unicast response schemas for the application.
 * It includes schemas for NTP response messages and setting client IDs,
 * allowing for validation of specific WebSocket responses.
 */

import { z } from 'zod';

/**
 * Schema for NTP response messages.
 *
 * @typedef {Object} NTPResponseMessage
 * @property {string} type - The type of the message, should be "NTP_RESPONSE".
 * @property {number} t0 - Client send timestamp (echoed back).
 * @property {number} t1 - Server receive timestamp.
 * @property {number} t2 - Server send timestamp.
 */
const NTPResponseMessageSchema = z.object({
  type: z.literal('NTP_RESPONSE'),
  t0: z.number(),
  t1: z.number(),
  t2: z.number(),
});
export type NTPResponseMessageType = z.infer<typeof NTPResponseMessageSchema>;

/** Schema for setting client ID */
const SetClientID = z.object({
  type: z.literal('SET_CLIENT_ID'),
  clientId: z.string(),
});

/**
 * Defines the WebSocket unicast schema as a discriminated union of message types.
 */
export const WSUnicastSchema = z.discriminatedUnion('type', [
  NTPResponseMessageSchema,
  SetClientID,
]);

/**
 * Export the inferred TypeScript type from the schema.
 */
export type WSUnicastType = z.infer<typeof WSUnicastSchema>;
