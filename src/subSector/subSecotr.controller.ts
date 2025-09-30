import { Controller } from '@nestjs/common';
import { SubSectorService } from './subSector.service';

@Controller('api/v2/subSector')
export class SubSectorController {
  constructor(private service: SubSectorService) {}
}
