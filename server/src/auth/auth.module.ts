import { AuthGuard } from './auth.guard';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
<<<<<<< HEAD

@Module({
  imports: [
=======
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
>>>>>>> main
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'fabrika',
<<<<<<< HEAD
      signOptions: {
        expiresIn: '1h',
      },
=======
>>>>>>> main
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
