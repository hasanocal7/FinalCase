import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UnauthorizedException,
  Req,
  NotFoundException,
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
      throw new NotFoundException('User Not Found');
    }
  }

  @Post('register')
  async createUser(@Body() createDto: CreateUserDto) {
    return this.authService.signUp(createDto);
  }

  @Get('home')
  getHome(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('refresh')
  async rotateRefreshToken(@Req() req: Request) {
    try {
      const oldRefreshToken = req.headers['authorization'].split(' ')[1];
      const decodedToken =
        await this.authService.decodeRefreshToken(oldRefreshToken);
      const accessToken = await this.authService.createAccessToken(
        decodedToken['UserId'],
      );
      return { accessToken: accessToken };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
