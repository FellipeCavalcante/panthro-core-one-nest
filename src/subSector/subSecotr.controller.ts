import { Body, Controller, Post } from '@nestjs/common';
import { SubSectorService } from './subSector.service';
import { GetUserId } from 'src/utils/decorators/get-user-id.decorator';
import { CreateSubSectorDto } from './create-subSector';

@Controller('api/v2/subSector')
export class SubSectorController {
  constructor(private service: SubSectorService) {}

  @Post('create')
  async create(@GetUserId() id: string, @Body() request: CreateSubSectorDto) {
    return this.service.create({ id, ...request });
  }
}
