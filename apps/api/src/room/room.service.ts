import { Injectable, Logger } from '@nestjs/common';
import {
  MoveClientParams,
  ListeningSourceParams,
  RoomStateResponse,
  GridConfig,
} from './interfaces/room.types';
import { ConfigService } from '../config/config.service';
import { Server, Socket } from 'socket.io';
import {
  ClientType,
  PositionType,
  WsBroadcastTypeEnum,
  WsBroadcastType,
  RoomData,
} from '../utils/types/SharedTypes';
import { existsSync } from 'fs';
import { readdir, rm } from 'fs/promises';
import * as path from 'path';
import { positionClientsInCircle, calculateGainFromDistanceToSource } from './utils/spatial.utils';

/**
 * Service responsible for managing room-related operations in the WebSocket application.
 *
 * This service handles:
 * - Room creation and management
 * - Client addition and removal
 * - Spatial audio positioning
 * - Room state tracking
 * - File cleanup for rooms
 *
 * @class
 * @description Manages the lifecycle and state of rooms in the application
 */
@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);
  private rooms = new Map<string, RoomData>();

  /**
   * Grid origin constants for positioning clients
   * @type {GridConfig}
   */
  private readonly GRID: GridConfig = { ORIGIN_X: 0, ORIGIN_Y: 0 };

  /**
   * Constructor for RoomService
   *
   * @param {ConfigService} configService - Service for accessing application configuration
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Creates a new room or returns an existing room
   *
   * @param {string} roomId - Unique identifier for the room
   * @returns {RoomData} The created or existing room
   */
  createRoom(roomId: string): RoomData {
    if (this.rooms.has(roomId)) {
      return this.rooms.get(roomId)!;
    }

    const newRoom: RoomData = {
      roomId,
      clients: new Map<string, ClientType>(),
      listeningSource: { x: this.GRID.ORIGIN_X, y: this.GRID.ORIGIN_Y },
    };

    this.rooms.set(roomId, newRoom);
    return newRoom;
  }

  /**
   * Retrieves all rooms and their states
   *
   * @returns {RoomStateResponse[]} Array of room states
   */
  getAllRooms(): RoomStateResponse[] {
    return Array.from(this.rooms.keys())
      .map(roomId => this.getRoomState(roomId))
      .filter(Boolean) as RoomStateResponse[];
  }

  /**
   * Adds a user to a specific room
   *
   * @param {string} roomId - The ID of the room to join
   * @param {string} userId - Unique identifier for the user
   * @param {string} username - Display name of the user
   * @param {Socket} socket - WebSocket connection for the user
   * @returns {void}
   */
  addUserToRoom(roomId: string, userId: string, username: string, socket: Socket): void {
    let room = this.rooms.get(roomId);

    if (!room) {
      room = this.createRoom(roomId);
    }

    // Add client to the room
    const clientData: ClientType = {
      username,
      clientId: userId,
      ws: socket,
      rtt: 0,
      position: { x: this.GRID.ORIGIN_X, y: this.GRID.ORIGIN_Y - 25 },
    };

    room.clients.set(userId, clientData);

    // Position clients in a circle
    positionClientsInCircle(room.clients);
    this.logger.debug(
      `Client positions for room ${roomId}:`,
      Array.from(room.clients.values()).map(
        client => `${client.username} at (${client.position.x}, ${client.position.y})`,
      ),
    );
  }

  /**
   * Removes a user from a specific room
   *
   * @param {string} roomId - The ID of the room to leave
   * @param {string} userId - Unique identifier for the user
   */
  removeUserFromRoom(roomId: string, userId: string): void {
    try {
      const room = this.rooms.get(roomId);
      if (!room) return;

      room.clients.delete(userId);

      if (room.clients.size === 0) {
        this.stopInterval(roomId);

        try {
          this.cleanupRoomFiles(roomId).catch(error => {
            const err = error as Error;
            this.logger.error(`Error cleaning up room files: ${err.message}`);
          });
        } catch (error: unknown) {
          const err = error as Error;
          this.logger.error(`Error initiating room files cleanup: ${err.message}`);
        }

        this.rooms.delete(roomId);
      } else {
        positionClientsInCircle(room.clients);
      }
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Error removing user from room: ${err.message}`);
    }
  }

  /**
   * Cleans up audio files associated with a room when it becomes empty
   *
   * @param {string} roomId - The ID of the room to clean up
   * @returns {Promise<void>}
   */
  async cleanupRoomFiles(roomId: string): Promise<void> {
    try {
      const roomDirPath = path.join(this.configService.AUDIO_DIR, `room-${roomId}`);

      if (existsSync(roomDirPath)) {
        const files = await readdir(roomDirPath);
        this.logger.log(`Found room directory for ${roomId}, cleaning up ${files.length} files...`);

        // Delete each file and then the directory
        await Promise.all(files.map(file => rm(path.join(roomDirPath, file), { force: true })));

        // Remove the directory
        await rm(roomDirPath, { recursive: true, force: true });
        this.logger.log(`Cleaned up audio files for room ${roomId}`);
      } else {
        this.logger.log(`No audio directory found for room ${roomId}`);
      }
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Error cleaning up room files for ${roomId}: ${err.message}`);
    }
  }

  /**
   * Retrieves the current state of a room
   *
   * @param {string} roomId - The ID of the room to get state for
   * @returns {RoomStateResponse|null} Current room state or null if room doesn't exist
   */
  getRoomState(roomId: string): RoomStateResponse | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    return {
      roomId: room.roomId,
      clients: Array.from(room.clients.values()).map(client => ({
        username: client.username,
        clientId: client.clientId,
        position: client.position,
      })),
      listeningSource: room.listeningSource,
    };
  }

  /**
   * Retrieves all clients in a specific room
   *
   * @param {string} roomId - The ID of the room to get clients from
   * @returns {ClientType[]} Array of clients in the room
   */
  getClients(roomId: string): ClientType[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];

    return Array.from(room.clients.values());
  }

  /**
   * Reorders clients in a room, moving a specific client to the front
   *
   * @param {string} roomId - The ID of the room
   * @param {string} clientId - The ID of the client to move
   * @param {Server} server - Socket.IO server instance for broadcasting
   * @returns {ClientType[]} Updated list of clients
   */
  reorderClients(roomId: string, clientId: string, server: Server): ClientType[] {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }

    const clients = Array.from(room.clients.values());
    const clientIndex = clients.findIndex(client => client.clientId === clientId);

    if (clientIndex === -1) return clients;

    // Move client to front of array
    const [client] = clients.splice(clientIndex, 1);
    clients.unshift(client);

    // Update clients map
    room.clients.clear();
    clients.forEach(client => {
      room.clients.set(client.clientId, client);
    });

    // Reposition clients and update gains
    positionClientsInCircle(room.clients);
    this.calculateGainsAndBroadcast(room, server);

    return clients;
  }

  /**
   * Starts a periodic interval for updating spatial audio configuration
   *
   * @param {string} roomId - The ID of the room
   * @param {Server} server - Socket.IO server instance for broadcasting
   */
  startInterval(roomId: string, server: Server): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    let loopCount = 0;

    const updateSpatialAudio = () => {
      const clients = Array.from(room.clients.values());
      if (clients.length === 0) return;

      // Calculate new position for listening source
      const radius = 25;
      const centerX = this.GRID.ORIGIN_X;
      const centerY = this.GRID.ORIGIN_Y;
      const angle = (loopCount * Math.PI) / 30;

      const newX = centerX + radius * Math.cos(angle);
      const newY = centerY + radius * Math.sin(angle);

      room.listeningSource = { x: newX, y: newY };

      // Calculate and broadcast gains
      this.calculateGainsAndBroadcast(room, server);
      loopCount++;
    };

    room.intervalId = setInterval(updateSpatialAudio, 100);
  }

  /**
   * Stops the periodic interval for a specific room
   *
   * @param {string} roomId - The ID of the room
   */
  stopInterval(roomId: string): void {
    const room = this.rooms.get(roomId);
    if (!room || !room.intervalId) return;

    clearInterval(room.intervalId);
    room.intervalId = undefined;
  }

  /**
   * Calculates and broadcasts spatial audio gains for all clients in a room
   *
   * @param {RoomData} room - The room data
   * @param {Server} server - Socket.IO server instance for broadcasting
   */
  calculateGainsAndBroadcast(room: RoomData, server: Server): void {
    const clients = Array.from(room.clients.values());
    const gains: Record<string, { gain: number; rampTime: number }> = {};

    clients.forEach(client => {
      const gain = calculateGainFromDistanceToSource({
        client: client.position,
        source: room.listeningSource,
        minGain: this.configService.AUDIO_LOW,
        maxGain: this.configService.AUDIO_HIGH,
      });

      gains[client.clientId] = {
        gain,
        rampTime: this.configService.VOLUME_UP_RAMP_TIME,
      };
    });

    /**
     * Creates a broadcast message for spatial audio configuration
     *
     * @type {WsBroadcastType} Message containing listening source position and client gains
     * @property {WsBroadcastTypeEnum.RoomMessage} type - Type of WebSocket broadcast
     * @property {Object} payload - Spatial audio configuration payload
     * @property {PositionType} payload.listeningSource - Current position of the listening source
     * @property {Record<string, { gain: number; rampTime: number }>} payload.gains - Gain configurations for each client
     */

    type BroadcastPayload = {
      listeningSource: PositionType;
      gains: Record<string, { gain: number; rampTime: number }>;
    };

    const message: WsBroadcastType<BroadcastPayload> = {
      type: WsBroadcastTypeEnum.RoomMessage,
      payload: {
        listeningSource: room.listeningSource,
        gains,
      },
    };

    // Use Socket.IO server to broadcast
    server.to(room.roomId).emit(message.type, message.payload);
  }

  /**
   * Updates the listening source position for a room
   *
   * @param {ListeningSourceParams} params - Parameters for updating listening source
   * @param {Server} server - Socket.IO server instance for broadcasting
   */
  updateListeningSource({ roomId, position }: ListeningSourceParams, server: Server): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.listeningSource = position;
    this.calculateGainsAndBroadcast(room, server);
  }

  /**
   * Moves a client to a new position within a room
   *
   * @param {MoveClientParams} params - Parameters for moving a client
   * @param {Server} server - Socket.IO server instance for broadcasting
   */
  moveClient({ roomId, clientId, position }: MoveClientParams, server: Server): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const client = room.clients.get(clientId);
    if (!client) return;

    client.position = position;
    room.clients.set(clientId, client);

    this.calculateGainsAndBroadcast(room, server);
  }
}
