import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';

@Controller('factories')
export class FactoriesController {
  constructor(private factoriesService: FactoriesService) {}

  @Post()
  async createFactory(@Body() createDto: CreateFactoryDto) {
    const factory = await this.factoriesService.create(createDto);
    return factory;
  }

  @Get()
  async getAllFactory() {
    const factories = await this.factoriesService.findAll();
    return factories;
  }

  @Get(':id')
  async getFactory(@Param('id') id: number) {
    const factory = await this.factoriesService.findOne(id);
    return factory;
  }

  @Patch(':id')
  async updateFactory(
    @Param('id') id: number,
    @Body() updateDto: UpdateFactoryDto,
  ) {
    const updatedFactory = await this.factoriesService.update(id, updateDto);
    return updatedFactory;
  }

  @Delete(':id')
  async deleteFactory(@Param('id') id: number) {
    return await this.factoriesService.delete(id);
  }
}
