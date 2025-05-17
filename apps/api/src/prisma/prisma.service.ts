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
  private readonly prisma: PrismaClient;

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
   */
  async createRoom(roomId: string) {
    this.logger.debug(`Adding a room: ${roomId} to the database ...`);
    try {
      const createRoom = await this.prisma.room.create({
        data: {
          id: roomId,
          active: true,
        },
        select: {
          id: true,
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
   *
   * @param {string} roomId - The unique identifier for the room to retrieve.
   * @returns {Promise<{ id: string; active: boolean } | null>} - A promise that resolves to the room object if found, or null if not found.
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
        },
      });
      this.logger.debug(room ? `Found room ${roomId}` : `Room ${roomId} not found`);
      return room;
    } catch (error) {
      this.logger.error(`Failed to get room ${roomId} \n error:`, error);
      throw error;
    }
  }
}
