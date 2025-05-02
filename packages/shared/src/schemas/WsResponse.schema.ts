/**
 * @fileOverview This module defines the WebSocket response schema for the application.
 * It combines the schemas for unicast and broadcast responses into a single union type
 * for validation of incoming WebSocket messages.
 */

import { z } from 'zod';
import { WSBroadcastSchema } from './WsBroadcast.schema';
import { WSUnicastSchema } from './WsUnicast.schema';

// Define the WebSocket response schema as a union of unicast and broadcast schemas
export const WSResponseSchema = z.union([WSUnicastSchema, WSBroadcastSchema]);

// Export the inferred TypeScript type from the schema
export type WSResponseType = z.infer<typeof WSResponseSchema>;
