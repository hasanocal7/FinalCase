import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Get, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async Login(@Body() email: string, @Body() password: string) {
    return await this.authService.signIn(email, password);
  }

  @Get('home')
  getHome(@Request() req) {
    return req.user;
  }
}
