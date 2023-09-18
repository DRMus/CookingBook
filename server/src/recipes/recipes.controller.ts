import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipe } from './dto/Recipe.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Рецепты')
@Controller('api/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() recipeDto: CreateRecipe,
    @UploadedFile() image: any,
  ) {
    return await this.recipesService.createRecipe(recipeDto, image);
  }

  @Get()
  async getAll() {
    return this.recipesService.getAllRecipes();
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.getOneRecipe(id);
  }
}
