import { Injectable } from '@nestjs/common';
import * as path from 'path';

/**
 * Defines the configuration settings for audio-related parameters.
 * Controls gain levels and volume transition times for precise audio control.
 *
 * @property {number} AUDIO_LOW - Minimum gain value, representing the lowest audible volume
 * @property {number} AUDIO_HIGH - Maximum gain value, representing full volume
 * @property {number} VOLUME_UP_RAMP_TIME - Duration for smoothly increasing volume
 * @property {number} VOLUME_DOWN_RAMP_TIME - Duration for smoothly decreasing volume
 */
interface AudioConfig {
  readonly AUDIO_LOW: number;
  readonly AUDIO_HIGH: number;
  readonly VOLUME_UP_RAMP_TIME: number;
  readonly VOLUME_DOWN_RAMP_TIME: number;
}

/**
 * Defines the network configuration settings for the server.
 * Specifies the host and port on which the application will run.
 *
 * @property {number} PORT - The network port number the server will listen on
 * @property {string} HOST - The network interface or IP address the server will bind to
 */
interface ServerConfig {
  readonly PORT: number;
  readonly HOST: string;
}

/**
 * Defines scheduling-related configuration settings.
 * Controls timing parameters for various scheduled operations in the application.
 *
 * @property {number} SCHEDULE_TIME_MS - Time interval in milliseconds for scheduling recurring tasks
 */
interface ScheduleConfig {
  readonly SCHEDULE_TIME_MS: number;
}

@Injectable()
export class ConfigService implements AudioConfig, ServerConfig, ScheduleConfig {
  /** Path Configurations for audio files */
  public readonly AUDIO_DIR = path.join(process.cwd(), 'uploads', 'audio');

  /** Server configuration */
  public readonly PORT = 8080;
  public readonly HOST = '0.0.0.0';

  /** Audio settings */
  public readonly AUDIO_LOW = 0.15;
  public readonly AUDIO_HIGH = 1.0;
  public readonly VOLUME_UP_RAMP_TIME = 0.5;
  public readonly VOLUME_DOWN_RAMP_TIME = 0.5;

  /** Scheduling settings */
  public readonly SCHEDULE_TIME_MS = 3000;
}
