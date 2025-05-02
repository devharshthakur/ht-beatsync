import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { RoomService } from '../room/room.service';
import * as os from 'os';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
/**
 * Service for gathering system and application statistics
 */
@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly roomService: RoomService,
  ) {}

  /**
   * Gathers comprehensive statistics about the system and application
   *
   * @returns {Promise<Record<string, any>>} Object containing statistics
   */
  async getStats(): Promise<Record<string, any>> {
    try {
      // CPU Stats
      const cpus = os.cpus();
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const usedMemory = totalMemory - freeMemory;
      const memoryUsage = process.memoryUsage();

      // OS Info
      const osInfo = {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        uptime: os.uptime(),
      };

      // System resources
      const systemStats = {
        cpu: {
          count: cpus.length,
          cores: cpus.map(core => ({
            model: core.model,
            speed: core.speed,
          })),
        },
        memory: {
          total: `${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
          free: `${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
          used: `${(usedMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
          process: {
            rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
            heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
            external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
            arrayBuffers: `${(memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)} MB`,
          },
        },
        os: osInfo,
      };

      // Room details from RoomService
      const roomStates = this.roomService.getAllRooms();
      const roomDetails = Object.fromEntries(
        roomStates.map(room => [
          room.roomId,
          {
            clientCount: room.clients.length,
            // Add other room-specific details if needed
          },
        ]),
      );

      // Audio Directory Stats
      let audioDirStats: Record<string, any> = {
        path: this.configService.AUDIO_DIR,
        exists: false,
        roomFolders: 0,
        error: null,
      };

      try {
        if (fs.existsSync(this.configService.AUDIO_DIR)) {
          audioDirStats.exists = true;
          const entries = await fsPromises.readdir(this.configService.AUDIO_DIR, {
            withFileTypes: true,
          });
          audioDirStats.roomFolders = entries.filter(
            entry => entry.isDirectory() && entry.name.startsWith('room-'),
          ).length;
        }
      } catch (err) {
        this.logger.error(`Error reading audio directory: ${err.message}`, err.stack);
        audioDirStats.error = err.message;
      }

      return {
        ...systemStats,
        app: {
          uptime: process.uptime(),
          nodeVersion: process.version,
        },
        rooms: {
          total: roomStates.length,
          details: roomDetails,
        },
        audioStorage: audioDirStats,
        env: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Error gathering system stats: ${error.message}`, error.stack);
      throw error;
    }
  }
}
