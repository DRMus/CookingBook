import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipe, Filters } from './dto/Recipe.dto';
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

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() recipeDto: CreateRecipe,
    @UploadedFile() image: any,
  ) {
    return this.recipesService.updateRecipe(id, recipeDto, image);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.deleteRecipe(id);
  }

  @Post('filter')
  async filter(@Body() filterDto: Filters) {
    return this.recipesService.filteredRecipes(filterDto);
  }
}
