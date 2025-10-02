import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "./config/guard/constants/constants";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  healthCheck(): { status: string; timestamp: string } {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("/he")
  getHello(): string {
    return this.appService.getHello();
  }
}
