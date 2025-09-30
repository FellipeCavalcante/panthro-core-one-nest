import { Module } from '@nestjs/common';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [SectorController],
  providers: [SectorService, PrismaService],
  exports: [],
})
export class SectorModule {}
