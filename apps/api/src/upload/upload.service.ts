import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { UploadAudioDto } from './dto/upload-audio.dto';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import { EventsGateway } from '../events/events.gateway';
import { WsBroadcastTypeEnum } from '../utils/types/SharedTypes';

/**
 * Service handling audio file upload operations
 */
@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  /**
   * Handles the upload of an audio file
   *
   * @param {UploadAudioDto} uploadAudioDto - DTO containing upload information
   * @returns {Promise<{ success: boolean }>} Success status
   */
  async uploadAudio(uploadAudioDto: UploadAudioDto): Promise<{ success: boolean }> {
    try {
      const { name, audioData, roomId } = uploadAudioDto;

      // Create room-specific directory if it doesn't exist
      const roomDir = path.join(this.configService.AUDIO_DIR, `room-${roomId}`);
      await fsPromises.mkdir(roomDir, { recursive: true });

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const ext = path.extname(name) || '.mp3'; // Preserve original extension or default to mp3
      const filename = `${timestamp}${ext}`;

      // The ID that will be used for retrieving the file (includes room path)
      const fileId = path.join(`room-${roomId}`, filename);
      // Full path to the file
      const filePath = path.join(this.configService.AUDIO_DIR, fileId);

      // Decode base64 audio data and write to file
      const audioBuffer = Buffer.from(audioData, 'base64');
      await fsPromises.writeFile(filePath, audioBuffer);

      // Broadcast the new audio source to all clients in the room
      this.eventsGateway.sendBroadcast({
        roomId,
        message: {
          type: WsBroadcastTypeEnum.RoomMessage,
          payload: {
            type: 'NEW_AUDIO_SOURCE',
            id: fileId,
            title: name,
            duration: 1, // TODO: Calculate duration correctly
            addedAt: Date.now(),
            addedBy: roomId,
          },
        },
      });

      return { success: true };
    } catch (error) {
      this.logger.error(`Error handling audio upload: ${error.message}`, error.stack);
      throw error;
    }
  }
}
