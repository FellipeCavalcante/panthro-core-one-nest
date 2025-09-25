import { LoginDto } from './dtos/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants/constants';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('api/v2/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() request: LoginDto) {
    return await this.authService.login(request);
  }

  @Public()
  @Post('register')
  async register(@Body() request: CreateUserDto) {
    return await this.authService.create(request);
  }
}
