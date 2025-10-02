import { Module } from '@nestjs/common';
import { SubSectorController } from './subSecotr.controller';
import { SubSectorService } from './subSector.service';

@Module({
  imports: [],
  controllers: [SubSectorController],
  providers: [SubSectorService],
})
export class SubSectorModule {}
