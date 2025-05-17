/**
 * @file PrismaController
 * This controller is responsible for handling HTTP requests related to the Prisma service.
 *
 * @see: As a standard practice, we do not expose our CRUD operations directly through controllers.
 * This controller only provides a health check endpoint for database connectivity.
 */

import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('prisma')
export class PrismaController {
  private readonly logger = new Logger(PrismaController.name);
  private readonly prismaService: PrismaService;

  /**
   * Basic health check endpoint to verify the database connection status.
   * Returns 200 OK if connected, 503 Service Unavailable otherwise.
   */
  @Get('health')
  async checkDatabaseHealth(): Promise<{ status: string; message?: string }> {
    this.logger.log('Initiating database health check via service...');
    try {
      await this.prismaService.checkDbHealth();
      this.logger.log('Database health check successful.');
      return { status: 'ok', message: 'Database connection is healthy.' };
    } catch (error) {
      this.logger.error('Database health check failed via service call:', error);
      throw new HttpException(
        { status: 'error', message: 'Database connection failed.' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
