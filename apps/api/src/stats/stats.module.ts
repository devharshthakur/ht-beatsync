import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { ConfigModule } from '../config/config.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [ConfigModule, RoomModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
