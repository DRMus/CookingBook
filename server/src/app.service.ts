import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { CreateUser } from './dto/CreateUser';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async saveSome(dto: CreateUser) {
    return this.databaseService.user.create({data: dto})
  }
}
