import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigModule } from '../config/config.module';
import { EventsGateway } from '../events/events.gateway';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [ConfigModule, RoomModule],
  controllers: [UploadController],
  providers: [UploadService, EventsGateway],
  exports: [UploadService],
})
export class UploadModule {}
