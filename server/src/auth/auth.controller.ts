import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async createUser(@Body() createDto: CreateUserDto) {
    return this.authService.signUp(createDto);
  }

  @Public()
  @Post('login')
  async Login(@Body() body: { email: string; password: string }) {
    try {
      const Tokens = await this.authService.signIn(body);
      return { accessToken: Tokens.accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('home')
  getHome(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  async rotateRefreshToken(@Res() res: Response, @Req() req: Request) {
    try {
      const oldRefreshToken = req.headers['authorization'].split(' ')[1];
      const decodedToken =
        await this.authService.decodeRefreshToken(oldRefreshToken);
      const TokenId = uuidv4();
      const refreshToken = await this.authService.createRefreshToken(
        decodedToken['UserId'],
        TokenId,
      );
      //localStorage.removeItem('refreshToken');
      //localStorage.setItem('refreshToken', refreshToken);
      res.json({
        accessToken: await this.authService.createAccessToken(
          decodedToken['UserId'],
        ),
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
