import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SubSectorService } from "./subSector.service";
import { GetUserId } from "src/utils/decorators/get-user-id.decorator";
import { CreateSubSectorDto } from "./dtos/create-subSector";

@Controller("api/v2/subSector")
export class SubSectorController {
  constructor(private service: SubSectorService) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  async create(@GetUserId() id: string, @Body() request: CreateSubSectorDto) {
    return this.service.create({ id, ...request });
  }
}
