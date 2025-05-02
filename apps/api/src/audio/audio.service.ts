import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as path from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import { GetAudioDto } from './dto/get-audio.dto';

/**
 * Service handling audio file operations
 */
@Injectable()
export class AudioService {
  private readonly logger = new Logger(AudioService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Retrieves an audio file by its ID
   *
   * @param {GetAudioDto} getAudioDto - DTO containing the audio file ID
   * @returns {Promise<{path: string, size: number}>} File path and size for streaming
   * @throws {NotFoundException} If the audio file doesn't exist
   */
  async getAudio(getAudioDto: GetAudioDto): Promise<{ path: string; size: number }> {
    try {
      const { id } = getAudioDto;

      // The id already contains the room-specific path
      const audioPath = path.join(this.configService.AUDIO_DIR, id);

      // Check if file exists
      if (!fs.existsSync(audioPath)) {
        this.logger.warn(`Audio file not found: ${audioPath}`);
        throw new NotFoundException('Audio file not found');
      }

      // Get file stats
      const stats = await fsPromises.stat(audioPath);

      return {
        path: audioPath,
        size: stats.size,
      };
    } catch (error) {
      this.logger.error(`Error retrieving audio file: ${error.message}`, error.stack);
      throw error;
    }
  }
}
