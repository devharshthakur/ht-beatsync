/**
 * @fileoverview
 * Room-specific type definitions for the application
 *
 * This file contains types specific to room operations, management,
 * and spatial audio functionality.
 */
import { ClientType, PositionType, ClientResponse } from '../../utils/types/SharedTypes';

/**
 * Core room data structure for in-memory state management
 */
export interface RoomData {
  clients: Map<string, ClientType>;
  roomId: string;
  intervalId?: NodeJS.Timeout;
  listeningSource: PositionType;
}

/**
 * Room state response returned to clients
 * Contains only the necessary information clients need to know about a room
 */
export interface RoomStateResponse {
  roomId: string;
  clients: ClientResponse[];
  listeningSource: PositionType;
}

/**
 * Room operation parameter interfaces
 */

/**
 * Parameters for moving a client within a room
 */
export interface MoveClientParams {
  clientId: string;
  position: PositionType;
  roomId: string;
}

/**
 * Parameters for updating a room's listening source position
 */
export interface ListeningSourceParams {
  position: PositionType;
  roomId: string;
}

/**
 * Configuration interfaces
 */

/**
 * Defines the configuration settings for the spatial grid used in room positioning.
 */
export interface GridConfig {
  readonly ORIGIN_X: number;
  readonly ORIGIN_Y: number;
}
