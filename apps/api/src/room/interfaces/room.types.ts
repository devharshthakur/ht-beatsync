import { ClientType, PositionType } from '../../utils/types/SharedTypes';

export interface RoomData {
  clients: Map<string, ClientType>;
  roomId: string;
  intervalId?: NodeJS.Timeout;
  listeningSource: PositionType;
}

/**
 * Client information as returned in room state responses
 * A simplified version of ClientType without sensitive or circular references
 */
export interface ClientResponse {
  username: string;
  clientId: string;
  position: PositionType;
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
 * Parameters for moving a client within a room
 *
 * @property {string} clientId - The ID of the client to move
 * @property {PositionType} position - The new position for the client
 * @property {string} roomId - The ID of the room containing the client
 */
export interface MoveClientParams {
  clientId: string;
  position: PositionType;
  roomId: string;
}

/**
 * Parameters for updating a room's listening source position
 *
 * @property {PositionType} position - The new position for the listening source
 * @property {string} roomId - The ID of the room to update
 */
export interface ListeningSourceParams {
  position: PositionType;
  roomId: string;
}

/**
 * Defines the configuration settings for the spatial grid used in room positioning.
 *
 * @interface GridConfig
 * @description Specifies the origin coordinates for positioning clients and audio sources
 * @property {number} ORIGIN_X - The x-coordinate of the grid's origin point
 * @property {number} ORIGIN_Y - The y-coordinate of the grid's origin point
 */
export interface GridConfig {
  readonly ORIGIN_X: number;
  readonly ORIGIN_Y: number;
}
