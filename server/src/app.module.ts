import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FactoriesModule } from './factories/factories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from './factories/factories.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.URL,
      entities: [Factory],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    FactoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
