/**
 * @file Upload Controller
 * @description Handles audio file upload requests and manages the upload process.
 * @module upload/upload.controller
 */

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
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Upload failed: ${err.message}`, err.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to process upload');
    }
  }
}
