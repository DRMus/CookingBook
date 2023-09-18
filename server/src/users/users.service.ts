import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUser } from './dto/CreateUser';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers() {
    return this.databaseService.user.findMany({
      include: { created_recipes: true },
    });
  }

  async getOneUserById(id: number) {
    return this.databaseService.user.findFirst({ where: { id } });
  }

  async getOneUserByUsername(username: string) {
    return this.databaseService.user.findFirst({ where: { username } });
  }

  async createUser(dto: CreateUser) {
    const newUser: CreateUser = {
      likes: '',
      ...dto,
    };
    return this.databaseService.user.create({ data: newUser });
  }

  async deleteUserById(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
