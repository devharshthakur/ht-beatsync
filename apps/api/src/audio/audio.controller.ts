import {
  Controller,
  Post,
  Body,
  StreamableFile,
  Header,
  HttpStatus,
  HttpCode,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { AudioService } from './audio.service';
import { GetAudioDto } from './dto/get-audio.dto';
import { createReadStream } from 'fs';

/**
 * Controller handling audio file operations
 */
@Controller('audio')
export class AudioController {
  private readonly logger = new Logger(AudioController.name);

  constructor(private readonly audioService: AudioService) {}

  /**
   * Endpoint for retrieving audio files
   *
   * @param {GetAudioDto} getAudioDto - DTO containing the audio file ID
   * @returns {StreamableFile} Audio file as a streamable response
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'audio/mpeg')
  @Header('Accept-Ranges', 'bytes')
  async getAudio(@Body() getAudioDto: GetAudioDto): Promise<StreamableFile> {
    try {
      const { path, size } = await this.audioService.getAudio(getAudioDto);

      // Create a readable stream from the file
      const fileStream = createReadStream(path);

      return new StreamableFile(fileStream, { length: size });
    } catch (error) {
      this.logger.error(`Error serving audio file: ${error.message}`);

      if (error.status === HttpStatus.NOT_FOUND) {
        throw error; // Re-throw NotFoundException
      }

      throw new BadRequestException('Failed to process audio request');
    }
  }
}
