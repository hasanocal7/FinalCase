import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';

const AccessTokenSignOptions: JwtSignOptions = {
  expiresIn: '15m',
};
const RefreshTokenSignOptions: JwtSignOptions = {
  expiresIn: '1d',
};
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async signIn(body: object) {
    try {
      const UserId = await this.usersService.login(body);
      if (!UserId) {
        throw new UnauthorizedException();
      }
      const TokenId = uuidv4();
      const accessToken = await this.createAccessToken(UserId);
      const refreshToken = await this.createRefreshToken(UserId, TokenId);
      const Tokens = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      return Tokens;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async decodeRefreshToken(token: string): Promise<object> {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async createAccessToken(UserId: string) {
    const accessToken = await this.jwtService.signAsync(
      { UserId },
      AccessTokenSignOptions,
    );
    return accessToken;
  }

  async createRefreshToken(UserId: string, TokenId: string) {
    const refreshToken = await this.jwtService.signAsync(
      { UserId, TokenId },
      RefreshTokenSignOptions,
    );
    return refreshToken;
  }
}
