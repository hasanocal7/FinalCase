import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class UsersService {
  index = 'search-users';
  constructor(private elasticsearchService: ElasticsearchService) {}

  async create(createUserDto: CreateUserDto) {
    const userBody = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      authority: createUserDto.authority,
    };

    let results = await this.elasticsearchService.search({
      index: this.index,
      query: {
        match_all: {},
      },
    });
    const users = results.hits.hits;
    const user = users.find(
      (user) => user._source['email'] === createUserDto.email,
    );

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.elasticsearchService.index({
      index: this.index,
      document: userBody,
    });

    return userBody;
  }

  async findAll() {
    const users = await this.elasticsearchService.search({
      index: this.index,
      query: {
        match_all: {},
      },
    });
    let result = users.hits.hits;
    return result.map((user) => user._source);
  }

  async findOne(id: string) {
    const user = await this.elasticsearchService.search({
      index: this.index,
      query: {
        match: {
          _id: id,
        },
      },
    });
    return user.hits.hits[0]._source;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.elasticsearchService.update({
      index: this.index,
      id: id,
      doc: updateUserDto,
    });

    return result.result;
  }

  async delete(id: string) {
    const result = await this.elasticsearchService.delete({
      index: this.index,
      id: id,
    });
    return result.result;
  }
  async login(body: object) {
    let results = await this.elasticsearchService.search({
      index: this.index,
      query: {
        match_all: {},
      },
    });
    const users = results.hits.hits;
    const user = users.find((user) => user._source['email'] === body['email']);
    if (!user) {
      throw new BadRequestException();
    } else {
      return user._id;
    }
  }
}
