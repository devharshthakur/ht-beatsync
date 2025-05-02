import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadAudioDto } from './dto/upload-audio.dto';

/**
 * Controller handling audio file upload operations
 */
@Controller('upload')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private readonly uploadService: UploadService) {}

  /**
   * Endpoint for uploading audio files
   *
   * @param {UploadAudioDto} uploadAudioDto - DTO containing upload information
   * @returns {Promise<{ success: boolean }>} Success status
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async uploadAudio(@Body() uploadAudioDto: UploadAudioDto): Promise<{ success: boolean }> {
    try {
      return await this.uploadService.uploadAudio(uploadAudioDto);
    } catch (error) {
      this.logger.error(`Upload failed: ${error.message}`, error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to process upload');
    }
  }
}
