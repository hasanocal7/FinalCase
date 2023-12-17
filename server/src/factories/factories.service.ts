import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Factory } from './factories.entity';
import { EntityManager, Repository, TableColumn } from 'typeorm';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory) private factoriesRepository: Repository<Factory>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async create(createDto: CreateFactoryDto) {
    const factory = this.factoriesRepository.create(createDto);
    return await this.factoriesRepository.save(factory);
  }
  async findAll(): Promise<Factory[]> {
    return this.factoriesRepository.find();
  }
  async findOne(id: number): Promise<Factory> {
    return this.factoriesRepository.findOneBy({ id });
  }
  async update(id: number, updateDto: UpdateFactoryDto) {
    return this.factoriesRepository.update(id, updateDto);
  }
  async delete(id: number): Promise<void> {
    await this.factoriesRepository.delete(id);
  }

  async up(name: string, type: string) {
    await this.entityManager.query(`ALTER TABLE factory ADD ${name} ${type}`);
  }
  async down(name: string) {
    await this.entityManager.query(`ALTER TABLE factory DROP COLUMN ${name}`);
  }
}
