import { Module } from '@nestjs/common';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@workspace/prisma';

@Module({
  controllers: [PrismaController],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    PrismaService,
  ],
  exports: [PrismaClient, PrismaService],
})
export class PrismaModule {}
