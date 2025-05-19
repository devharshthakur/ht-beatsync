import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@workspace/prisma';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly prisma = new PrismaClient();

  async onModuleInit() {
    this.logger.log('Connecting PrismaClient');
    try {
      await this.prisma.$connect();
      this.logger.log('PrismaClient Sucessfully connected');
    } catch (error) {
      this.logger.log('Failed to connect to prisma client');
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting the prisma client ...');
    try {
      await this.prisma.$disconnect();
    } catch (error) {
      this.logger.log('Failed to disconnect prisma client');
    }
  }

  /**
   * Performs a simple database query to check if the connection is healthy.
   * Throws an InternalServerErrorException if the check fails.
   */
  async checkDbHealth(): Promise<void> {
    this.logger.debug('Performing database health check...');
    try {
      await this.prisma.room.count({
        take: 1,
      });
      this.logger.debug('Database health check query successful.');
    } catch (error) {
      this.logger.error('Database health check query failed:', error);
      throw new InternalServerErrorException('Database health check failed.');
    }
  }

  /**
   * Creates a new room in the database.
   * @param {string} roomId - The unique identifier for the room to be created.
   * @param {string} userId - The user who is creating/owning the room.
   */
  async createRoom(roomId: string, userId: string) {
    this.logger.debug(`Adding a room: ${roomId} to the database ...`);
    try {
      const createRoom = await this.prisma.room.create({
        data: {
          id: roomId,
          active: true,
          owner: {
            connect: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
          active: true,
        },
      });
      this.logger.debug(`Room added successfully id: ${roomId}`);
      return createRoom;
    } catch (error) {
      this.logger.debug(`Failed to add Room ${roomId} \n error: ${error}`);
      return null; // Return null in case of failure
    }
  }

  /**
   * Removes a room from the database by first deactivating it and then deleting it.
   *
   * @param {string} roomId - The unique identifier for the room to be removed.
   * @returns {Promise<void>} - A promise that resolves when the room has been removed.
   */
  async removeRoom(roomId: string): Promise<void> {
    this.logger.debug(`Removing the room: ${roomId} ...`);
    try {
      // First deactivate the room by changing its active status
      await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          active: false,
        },
      });
      // After deactivation now remove/delete the room
      await this.prisma.room.delete({
        where: {
          id: roomId,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to deactivate & remove room: ${roomId} \n error: ${error}`);
    }
  }

  /**
   * Checks whether a room is active based on its ID.
   *
   * @param {string} roomId - The unique identifier for the room to check.
   * @returns {Promise<boolean>} - A promise that resolves to true if the room is active, false otherwise.
   */
  async isRoomActive(roomId: string): Promise<boolean> {
    this.logger.debug(`Checking whether room: ${roomId} is active`);
    try {
      const room = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          id: true,
        },
      });

      const isActive = !!room;
      this.logger.debug(`Room ${roomId} active status: ${isActive}`);
      return isActive;
    } catch (error) {
      this.logger.error(`Failed to check active status for room ${roomId} \n error:`, error);
      throw error;
    }
  }

  /**
   * Retrieves a room by its ID.
   * @param {string} roomId - The unique identifier for the room to retrieve.
   * @returns {Promise<Room | null>} The room object or null if not found
   */
  async getRoomById(roomId: string) {
    this.logger.debug(`Fetching room with id: ${roomId} ...`);
    try {
      const room = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          id: true,
          active: true,
          userId: true,
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
          clients: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      this.logger.debug(room ? `Found room ${roomId}` : `Room ${roomId} not found`);
      return room;
    } catch (error) {
      this.logger.error(`Failed to get room ${roomId} \n error:`, error);
      throw error;
    }
  }

  /**
   * Retrieves all active rooms from the database.
   */
  async getAllRooms() {
    this.logger.debug('Fetching all rooms...');
    try {
      const rooms = await this.prisma.room.findMany({
        select: {
          id: true,
          active: true,
        },
      });
      this.logger.debug(`Found ${rooms.length} rooms`);
      return rooms;
    } catch (error) {
      this.logger.error('Failed to get all rooms \n error:', error);
      throw error;
    }
  }

  async addUserToRoom(roomId: string, userId: string) {
    this.logger.debug(`Associating user ${userId} with room ${roomId}`);
    try {
      const room = await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          clients: {
            connect: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
          active: true,
          clients: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      this.logger.debug(`Successfully associated user ${userId} with room ${roomId}`);
      return room;
    } catch (error) {
      this.logger.error(`Failed to associate user ${userId} with room ${roomId} \n error:`, error);
      throw error;
    }
  }

  /**
   * Removes a user from a room's client list.
   * @param {string} roomId - The unique identifier for the room.
   * @param {string} userId - The unique identifier for the user to remove.
   */
  async removeUserFromRoom(roomId: string, userId: string): Promise<void> {
    this.logger.debug(`Removing user ${userId} from room ${roomId}`);
    try {
      await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          clients: {
            disconnect: {
              id: userId,
            },
          },
        },
      });

      this.logger.debug(`Successfully removed user ${userId} from room ${roomId}`);
    } catch (error) {
      this.logger.error(`Failed to remove user ${userId} from room ${roomId} \n error:`, error);
      throw error;
    }
  }
}
