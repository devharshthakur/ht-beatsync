/**
 * @fileOverview This module defines the schemas and types for WebSocket broadcast messages
 * in a real-time application. It includes schemas for client information, audio sources,
 * spatial audio configurations, and various room events.
 */

import { z } from 'zod';
import { PauseActionSchema, PlayActionSchema } from './WsRequest.schema';
import { PositionSchema } from './basic.schema';

/** Schema for client information */
const ClientSchema = z.object({
  username: z.string(),
  clientId: z.string(),
  ws: z.any(),
  rtt: z.number().nonnegative().default(0),
  position: PositionSchema,
});
export type ClientType = z.infer<typeof ClientSchema>;

/** Schema for client change messages */
const ClientChangeMessageSchema = z.object({
  type: z.literal('CLIENT_CHANGE'),
  clients: z.array(ClientSchema),
});

/** Schema for new audio sources */
const AudioSourceSchema = z.object({
  type: z.literal('NEW_AUDIO_SOURCE'),
  id: z.string(),
  title: z.string(),
  duration: z.number().positive(),
  thumbnail: z.string().url().optional(),
  addedAt: z.number(),
  addedBy: z.string(),
});
export type AudioSourceType = z.infer<typeof AudioSourceSchema>;

/** Schema for spatial audio configuration */
const SpatialConfigSchema = z.object({
  type: z.literal('SPATIAL_CONFIG'),
  gains: z.record(z.string(), z.object({ gain: z.number().min(0).max(1), rampTime: z.number() })),
  listeningSource: PositionSchema,
});
export type SpatialConfigType = z.infer<typeof SpatialConfigSchema>;

/** Schema for stopping spatial audio */
const StopSpatialAudioSchema = z.object({
  type: z.literal('STOP_SPATIAL_AUDIO'),
});
export type StopSpatialAudioType = z.infer<typeof StopSpatialAudioSchema>;

/** Schema for scheduled actions */
const ScheduledActionSchema = z.object({
  type: z.literal('SCHEDULED_ACTION'),
  serverTimeToExecute: z.number(),
  scheduledAction: z.discriminatedUnion('type', [
    PlayActionSchema,
    PauseActionSchema,
    SpatialConfigSchema,
    StopSpatialAudioSchema,
  ]),
});

/** Schema for room events */
const RoomEventSchema = z.object({
  type: z.literal('ROOM_EVENT'),
  event: z.discriminatedUnion('type', [ClientChangeMessageSchema, AudioSourceSchema]),
});

/** Main broadcast schema */
export const WSBroadcastSchema = z.discriminatedUnion('type', [
  ScheduledActionSchema,
  RoomEventSchema,
]);

export type WSBroadcastType = z.infer<typeof WSBroadcastSchema>;
