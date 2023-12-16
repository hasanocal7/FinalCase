import { Module } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { FactoriesController } from './factories.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from './factories.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Factory])],
  providers: [FactoriesService],
  controllers: [FactoriesController],
})
export class FactoriesModule {}
