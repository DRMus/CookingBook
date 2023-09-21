import {
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
import { CreateUser, LikeDto, UserResponse } from './dto/CreateUser';
import { UsersService } from './users.service';
import { makeError } from 'src/utils/makeError';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecipeResponse } from 'src/recipes/dto/Recipe.dto';

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

  @ApiOperation({ summary: 'Получение лайков пользователя' })
  @ApiResponse({ status: 200, type: "string" })
  @UseGuards(JwtAuthGuard)
  @Get('/like/:id')
  async getLikes(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.getUserLikes(id);
    return res;
  }

  @ApiOperation({ summary: 'Получение избранных рецептов' })
  @ApiResponse({ status: 200, type: RecipeResponse })
  @UseGuards(JwtAuthGuard)
  @Get('/favorites/:id')
  async getFavorites(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.getUserFavorites(id);
    return res;
  }

  @ApiOperation({ summary: 'Получение созданных рецептов' })
  @ApiResponse({ status: 200, type: RecipeResponse })
  @UseGuards(JwtAuthGuard)
  @Get('/recipes/:id')
  async getRecipes(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.getUserRecipes(id);
    return res;
  }

  @ApiOperation({ summary: 'Добавления лайка рецепту' })
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(JwtAuthGuard)
  @Post('/like/:id')
  async addLike(@Param('id', ParseIntPipe) id: number, @Body() dto: LikeDto) {
    const res = await this.usersService.addLikeUserById(id, dto.recipeId);
    return res;
  }

  @ApiOperation({ summary: 'Удаление лайка с рецепта' })
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(JwtAuthGuard)
  @Post('/dislike/:id')
  async removeLike(@Param('id', ParseIntPipe) id: number, @Body() dto: LikeDto) {
    const res = await this.usersService.deleteUserLikeById(id, dto.recipeId);
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

  @ApiOperation({ summary: 'Удаление одного пользователя по id' })
  @ApiResponse({ status: 200, type: UserResponse })
  @Delete('/:id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.deleteUserById(id);
    return res;
  }
}
