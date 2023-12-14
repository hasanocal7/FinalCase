import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'https://myproject.es.europe-west3.gcp.cloud.es.io',
      auth: {
        username: 'elastic',
        password: 'vQU1xAxwXNM709IDBzMdkOXg',
      },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
