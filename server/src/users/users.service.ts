import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PassThrough } from 'stream';

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

  async login(email: string, password: string) {
    try {
      const user = await this.elasticsearchService.search({
        index: this.index,
        query: {
          bool: {
            must: [
              {
                match: {
                  email: email['email'],
                },
              },
              {
                match: {
                  password: password['password'],
                },
              },
            ],
          },
        },
      });

      if (user.hits.total === 0) {
        return null;
      }

      return user.hits.hits[0]._id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
