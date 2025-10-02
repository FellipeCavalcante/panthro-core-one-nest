import { LoginDto } from "./dtos/login.dto";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../../config/guard/constants/constants";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("api/v2/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginDto) {
    return await this.authService.login(request);
  }

  @Public()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() request: CreateUserDto) {
    return await this.authService.create(request);
  }
}
