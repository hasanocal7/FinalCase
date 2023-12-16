import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const UserId = await this.usersService.login(email, password);
    if (!UserId) {
      throw new UnauthorizedException();
    }
    const payload = { UserId: UserId };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
