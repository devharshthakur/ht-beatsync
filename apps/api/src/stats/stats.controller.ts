import { Controller, Get, InternalServerErrorException, Logger } from '@nestjs/common';
import { StatsService } from './stats.service';

/**
 * Controller handling system and application statistics
 */
@Controller('stats')
export class StatsController {
  private readonly logger = new Logger(StatsController.name);

  constructor(private readonly statsService: StatsService) {}

  /**
   * Endpoint for retrieving system and application statistics
   *
   * @returns {Promise<Record<string, any>>} System and application statistics
   */
  @Get()
  async getStats(): Promise<Record<string, any>> {
    try {
      return await this.statsService.getStats();
    } catch (error) {
      this.logger.error(`Error retrieving stats: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve system statistics');
    }
  }
}
