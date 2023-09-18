import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUser, UserResponse } from './dto/CreateUser';
import { UsersService } from './users.service';
import { hash } from 'bcrypt';
import { makeError } from 'src/utils/makeError';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: UserResponse })
  @Get()
  async getAll() {
    const res = await this.usersService.getAllUsers();
    return res;
  }

  @ApiOperation({ summary: 'Получение одного пользователя по id' })
  @ApiResponse({ status: 200, type: UserResponse })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.getOneUserById(id);
    return res;
  }

  @ApiOperation({ summary: 'Удаление одного пользователя по id' })
  @ApiResponse({ status: 200, type: UserResponse })
  @Delete('/:id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.deleteUserById(id);
    return res;
  }


  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserResponse })
  @Post('create')
  async create(@Body() dto: CreateUser) {
    try {
      const res = await this.usersService.createUser(dto);
      return res;
    } catch (e) {
      makeError(e);
    }
  }
}
