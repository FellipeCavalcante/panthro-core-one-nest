import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v2/user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('reports')
  async reports() {
    return this.service.reports();
  }
}
