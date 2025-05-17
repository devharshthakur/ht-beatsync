import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { EventsGateway } from './events/events.gateway';
import { RoomModule } from './room/room.module';
import { AudioModule } from './audio/audio.module';
import { StatsModule } from './stats/stats.module';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule, RoomModule, AudioModule, StatsModule, UploadModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
