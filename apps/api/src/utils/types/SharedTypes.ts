/**
 * @fileoverview
 * Core shared type definitions for application-wide use
 *
 * This file contains foundational types used throughout the application,
 * focusing on WebSocket communication patterns and core data structures.
 */
import type { PositionType } from '@repo/shared';
import { Socket } from 'socket.io';
import type { ClientType as SharedClientType } from '@repo/shared';

/**
 * Core client information interfaces
 */

/**
 * Interface for client information adapted for Socket.io
 * @property {string} username - Display name of the client
 * @property {string} clientId - Unique identifier for the client
 * @property {Socket} ws - Socket.io connection for the client
 * @property {number} rtt - Round-trip time in milliseconds
 * @property {PositionType} position - Spatial position of the client
 */
export interface ClientType {
  ws: Socket;
  username: string;
  clientId: string;
  rtt: number;
  position: PositionType;
}

/**
 * Client information without sensitive or circular references,
 * suitable for sending to clients
 */
export interface ClientResponse {
  username: string;
  clientId: string;
  position: PositionType;
}

// Re-export PositionType for convenience
export { type PositionType };

/**
 * WebSocket message type enumerations
 */

/**
 * Enumeration of broadcast message types for WebSocket communication.
 * These types are used to categorize messages sent to all clients within a room.
 */
export enum WsBroadcastTypeEnum {
  RoomMessage = 'roomMessage',
  UserJoined = 'userJoined',
  UserLeft = 'userLeft',
}

/**
 * Enumeration of unicast (direct) message types for WebSocket communication.
 * These types are used for messages sent directly to a specific client.
 */
export enum WsUnicastTypeEnum {
  ErrorMessage = 'errorMessage',
  SuccessMessage = 'successMessage',
  RoomJoined = 'roomJoined',
  Unauthorized = 'unauthorized',
  RoomState = 'roomState',
  NTP_RESPONSE = 'NTP_RESPONSE',
}

/**
 * WebSocket message interfaces
 */

/**
 * Interface defining the structure of a broadcast message.
 * @template T - The type of the payload being broadcast
 */
export interface WsBroadcastType<T = unknown> {
  type: WsBroadcastTypeEnum;
  payload: T;
}

/**
 * Interface defining the structure of a unicast (direct) message.
 * @template T - The type of the payload being sent
 */
export interface WsUnicastType<T = unknown> {
  type: WsUnicastTypeEnum;
  payload: T;
}

/**
 * Connection and session tracking interfaces
 */

/**
 * Interface representing the data associated with a connected WebSocket client.
 */
export interface WsData {
  userId: string;
  roomId: string;
}

/**
 * @deprecated Use WsBroadcastTypeEnum instead
 */
export enum WsBroadcastEnum {
  RoomMessage = 'roomMessage',
  UserJoined = 'userJoined',
  UserLeft = 'userLeft',
}
