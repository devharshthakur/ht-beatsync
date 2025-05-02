import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for audio file retrieval requests
 *
 * @property {string} id - Unique identifier of the audio file to retrieve
 */
export class GetAudioDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
