import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async Login(@Body() body: { email: string; password: string }) {
    try {
      const Tokens = await this.authService.signIn(body);
      return {
        accessToken: Tokens.accessToken,
        refreshToken: Tokens.refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('home')
  getHome(@Request() req) {
    return req.user;
  }
}
