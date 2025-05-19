/**
 * @fileoverview
 * Shared type definitions for WebSocket communication
 *
 * This file contains the core type definitions used throughout the WebSocket implementation,
 * including message types, payload structures, and client/room data interfaces.
 *
 * @Features
 * - WebSocket broadcast and unicast message type enums
 * - Strongly-typed message interfaces with generic payload support
 * - Client and room data structure definitions
 */
import type { PositionType } from '@repo/shared';
import { Socket } from 'socket.io';
import type { ClientType as SharedClientType } from '@repo/shared';

/**
 * Interface for client information adapted for Socket.io
 * Extends the original ClientType but replaces ServerWebSocket with Socket.io's Socket
 *
 * @property {string} username - Display name of the client
 * @property {string} clientId - Unique identifier for the client
 * @property {Socket} ws - Socket.io connection for the client
 * @property {number} rtt - Round-trip time in milliseconds
 * @property {PositionType} position - Spatial position of the client
 */
export interface ClientType extends Omit<SharedClientType, 'ws'> {
  ws: Socket;
  username: string;
  clientId: string;
  rtt: number;
  position: PositionType;
}

// Re-export PositionType
export { type PositionType };

/**
 * Enumeration of broadcast message types for WebSocket communication.
 * These represent events that are sent to all clients in a room.
 *
 * @deprecated Use WsBroadcastTypeEnum instead
 */
export enum WsBroadcastEnum {
  RoomMessage = 'roomMessage',
  UserJoined = 'userJoined',
  UserLeft = 'userLeft',
}

/**
 * Enumeration of broadcast message types for WebSocket communication.
 * These types are used to categorize messages sent to all clients within a room.
 *
 * @property {string} RoomMessage - A message sent by a user to the entire room
 * @property {string} UserJoined - Notification that a new user has joined the room
 * @property {string} UserLeft - Notification that a user has left the room
 */
export enum WsBroadcastTypeEnum {
  RoomMessage = 'roomMessage',
  UserJoined = 'userJoined',
  UserLeft = 'userLeft',
}

/**
 * Enumeration of unicast (direct) message types for WebSocket communication.
 * These types are used for messages sent directly to a specific client.
 *
 * @property {string} ErrorMessage - Error notification sent to a client
 * @property {string} SuccessMessage - Success notification for a client operation
 * @property {string} RoomJoined - Confirmation that a client has successfully joined a room
 * @property {string} Unauthorized - Notification that a client lacks permission for an operation
 * @property {string} RoomState - Update containing the current state of a room
 * @property {string} NTP_RESPONSE - Response to a Network Time Protocol synchronization request
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
 * Interface defining the structure of a broadcast message.
 * Broadcast messages are sent to all clients within a specific room.
 *
 * @template T - The type of the payload being broadcast
 * @property {WsBroadcastTypeEnum} type - The category of broadcast message
 * @property {T} payload - The data associated with the broadcast message
 */
export interface WsBroadcastType<T = unknown> {
  type: WsBroadcastTypeEnum;
  payload: T;
}

/**
 * Interface defining the structure of a unicast (direct) message.
 * Unicast messages are sent to a specific client rather than the entire room.
 *
 * @template T - The type of the payload being sent
 * @property {WsUnicastTypeEnum} type - The category of unicast message
 * @property {T} payload - The data associated with the unicast message
 */
export interface WsUnicastType<T = unknown> {
  type: WsUnicastTypeEnum;
  payload: T;
}

/**
 * Interface representing the data associated with a connected WebSocket client.
 * This information is stored in the connectedClients map to track active connections.
 *
 * @property {string} userId - The unique identifier of the user associated with the connection
 * @property {string} roomId - The identifier of the room the user is currently in
 */
export interface WsData {
  userId: string;
  roomId: string;
}

/**
 * Interface representing the state and configuration of a room.
 * Rooms contain multiple clients and handle communication between them.
 *
 * @property {Map<string, ClientType>} clients - Map of client IDs to client information
 * @property {string} roomId - The unique identifier of the room
 * @property {NodeJS.Timeout} [intervalId] - Optional timer for room-related scheduled tasks
 * @property {PositionType} listeningSource - The position of the audio listening source in the room
 */
export interface RoomData {
  clients: Map<string, ClientType>;
  roomId: string;
  intervalId?: NodeJS.Timeout;
  listeningSource: PositionType;
}
