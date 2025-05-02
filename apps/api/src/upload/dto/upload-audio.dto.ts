import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for audio file upload requests
 *
 * @property {string} name - Original filename of the audio file
 * @property {string} audioData - Base64-encoded audio file data
 * @property {string} roomId - ID of the room this audio belongs to
 */
export class UploadAudioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsBase64()
  @IsNotEmpty()
  audioData: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;
}
