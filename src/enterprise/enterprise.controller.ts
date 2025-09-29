import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dtos/create-enterprise.dto';
import { GetUserId } from 'src/utils/decorators/get-user-id.decorator';

@Controller('api/v2/enterprise')
export class EnterpriseController {
  constructor(private service: EnterpriseService) {}

  @Post('create')
  async create(@Body() request: CreateEnterpriseDto, @GetUserId() id: string) {
    console.log('ID vindo do decorator:', id);
    return this.service.create({ id, ...request });
  }

  @Get()
  async findAll() {
    return this.service.getAll();
  }
}
