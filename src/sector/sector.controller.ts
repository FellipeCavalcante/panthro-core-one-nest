import { Body, Controller, Get, Post } from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dtos/create-sector.dto';
import { GetUserId } from 'src/utils/decorators/get-user-id.decorator';

@Controller('api/v2/sector')
export class SectorController {
  constructor(private service: SectorService) {}

  @Post('create')
  async create(@Body() request: CreateSectorDto, @GetUserId() id: string) {
    return this.service.create({ id, ...request });
  }

  @Get()
  async getAll(@GetUserId() id: string) {
    return this.service.getAll(id);
  }
}
