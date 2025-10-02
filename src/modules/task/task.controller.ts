import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { GetUserId } from "src/utils/decorators/get-user-id.decorator";
import { CreateTaskDto } from "./dtos/create-task.dto";

@Controller("api/v2/task")
export class TaskController {
  constructor(private service: TaskService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  async create(@GetUserId() id: string, @Body() body: CreateTaskDto) {
    return this.service.create({ id, ...body });
  }
}
