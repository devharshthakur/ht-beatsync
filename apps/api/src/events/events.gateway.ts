/**
 * @fileoverview
 * WebSocket Gateway for handling real-time communication
 *
 * This gateway manages WebSocket connections, room management, and message broadcasting
 * between clients. It handles client connections, disconnections, and room joining events.
 *
 * @Features
 * - Client connection tracking
 * - Room-based communication
 * - Unicast and broadcast messaging
 * - User join/leave notifications
 *
 * The gateway integrates with the RoomService to maintain room state and user presence.
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../room/room.service';
import {
  ClientType,
  WsBroadcastType,
  WsBroadcastTypeEnum,
  WsData,
  WsUnicastType,
  WsUnicastTypeEnum,
} from '../utils/types/SharedTypes';

/**
 * Parameters required for a client to join a WebSocket room.
 * Provides the essential information needed to establish a client's presence in a room.
 *
 * @property {string} roomId - Unique identifier of the room the client wants to join
 * @property {string} userId - Unique identifier of the user attempting to join the room
 * @property {string} username - Display name of the user to be shown to other room participants
 */
interface JoinRoomParams {
  roomId: string;
  userId: string;
  username: string;
}

/**
 * WebSocketGateway that handles client connections and real-time communication
 *
 * This gateway manages WebSocket connections through Socket.IO, providing:
 * - Connection and disconnection handling
 * - Room-based messaging
 * - Client-to-client and client-to-room communication
 */
@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  /** Logger instance for tracking gateway events */
  private readonly logger = new Logger(EventsGateway.name);

  /** Map of connected clients with their associated data */
  private connectedClients = new Map<Socket['id'], WsData>();

  constructor(private readonly roomService: RoomService) {}

  /**
   * Broadcasts a message to all clients within a specific room.
   *
   * This method uses Socket.IO's room-based communication to send a message
   * to all clients currently joined in the specified room. It emits the message
   * with its specific type and payload, allowing for targeted, room-wide communication.
   *
   * @template T - The type of the payload being broadcast
   * @param {Object} params - The broadcast parameters
   * @param {string} params.roomId - The unique identifier of the room to broadcast to
   * @param {WsBroadcastType<T>} params.message - The message object containing type and payload
   */
  sendBroadcast<T>({ roomId, message }: { roomId: string; message: WsBroadcastType<T> }): void {
    this.server.to(roomId).emit(message.type, message.payload);
    this.logger.debug(`Broadcasted "${message.type}" to room ${roomId}`);
  }

  /**
   * Sends a unicast (direct) message to a specific client.
   *
   * This method sends a message directly to a single client socket,
   * allowing for private, one-to-one communication. It emits the message
   * with its specific type and payload to the provided socket.
   *
   * @template T - The type of the payload being sent
   * @param {Object} params - The unicast parameters
   * @param {Socket} params.ws - The socket connection of the target client
   * @param {WsUnicastType<T>} params.message - The message object containing type and payload
   */
  sendUnicast<T>({ ws, message }: { ws: Socket; message: WsUnicastType<T> }): void {
    ws.emit(message.type, message.payload);
    this.logger.debug(`Sent unicast "${message.type}" to client ${ws.id}`);
  }

  /**
   * Handles new client connections to the WebSocket server
   *
   * This method is called automatically when a new client connects
   * and logs the connection with the client's ID
   *
   * @param client - The socket connection of the client
   * @param args - Additional arguments passed during connection
   */
  handleConnection(client: Socket, ...args: unknown[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * Handles client disconnections from the WebSocket server
   *
   * This method:
   * 1. Logs the disconnection with the client's ID
   * 2. Retrieves the client's data from the connected clients map
   * 3. Broadcasts to the room that the user has left
   * 4. Removes the client from the connected clients map
   * 5. Removes the user from the room in the room service
   *
   * @param client - The socket connection of the client that disconnected
   */
  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
    const clientData = this.connectedClients.get(client.id);

    if (clientData) {
      this.sendBroadcast({
        roomId: clientData.roomId,
        message: {
          type: WsBroadcastTypeEnum.UserLeft,
          payload: {
            userId: clientData.userId,
            clientId: client.id,
          },
        },
      });

      this.connectedClients.delete(client.id);
      this.roomService.removeUserFromRoom(clientData.roomId, clientData.userId);
    }
  }

  /**
   * Handles a client joining a room
   *
   * This method:
   * 1. Adds the client to the connected clients map
   * 2. Joins the client to the specified room
   * 3. Adds the user to the room service
   * 4. Sends the current room state to the client
   * 5. Broadcasts to all users in the room that a new user has joined
   * @param data - Object containing roomId, userId, and username
   * @param client - The socket connection of the client
   */
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: JoinRoomParams, @ConnectedSocket() client: Socket): void {
    const { roomId, userId, username } = data;
    this.connectedClients.set(client.id, { userId, roomId });

    client.join(roomId);
    this.roomService.addUserToRoom(roomId, userId, username, client);

    const roomState = this.roomService.getRoomState(roomId);

    this.sendUnicast({
      ws: client,
      message: {
        type: WsUnicastTypeEnum.RoomJoined,
        payload: { roomState },
      },
    });

    this.sendBroadcast({
      roomId,
      message: {
        type: WsBroadcastTypeEnum.UserJoined,
        payload: { userId, username, clientId: client.id },
      },
    });
  }

  /**
   * Handles NTP (Network Time Protocol) requests for client clock synchronization
   *
   * This method implements a simplified version of NTP for precise timing
   * synchronization between the server and clients:
   *
   * 1. Records t1 (server receive time) immediately upon receiving request
   * 2. Processes the client's t0 timestamp (when client sent the request)
   * 3. Records t2 (server send time) just before sending the response
   * 4. Sends all timestamps back to client for offset calculation
   *
   * The client will calculate t3 (client receive time) and use all four
   * timestamps to compute the clock offset and round-trip delay.
   *
   * This is a critical component for maintaining synchronized timing across
   * distributed clients, enabling coordinated audio playback and other
   * time-sensitive operations in the BeatSync application.
   *
   * @param {Object} data - The NTP request data
   * @param {number} data.t0 - Client send timestamp (ms since epoch)
   * @param {Socket} client - The client's socket connection
   */
  @SubscribeMessage('NTP_REQUEST')
  handleNTPRequest(@MessageBody() data: { t0: number }, @ConnectedSocket() client: Socket): void {
    // Record server receive timestamp as precisely as possible
    const t1 = Date.now();

    // Record server send timestamp just before sending response
    // In a production system, you might want to use a more precise timing method
    const t2 = Date.now();

    this.sendUnicast({
      ws: client,
      message: {
        type: WsUnicastTypeEnum.NTP_RESPONSE,
        payload: {
          t0: data.t0, // Echo back the client's send time
          t1, // When server received the request
          t2, // When server sent the response
        },
      },
    });

    this.logger.debug(`NTP response sent to client ${client.id} (roundtrip: ${t2 - t1}ms)`);
  }
}
