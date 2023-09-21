import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRecipe, Filters } from './dto/Recipe.dto';
import { FilesService } from 'src/files/files.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Recipe } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly ingredientsService: IngredientsService,
    private readonly filesService: FilesService,
  ) {}

  private async parseRecipeDataForResponse(recipe: Recipe) {
    const { ingredients, alternate_ingredients } =
      await this.ingredientsService.parseAndGetIngredients(recipe.ingredients);

    const formatedResponse = {
      ...recipe,
      ingredients,
      alternate_ingredients,
    };
    return formatedResponse;
  }

  private async createResponse(recipes: Recipe[]) {
    const res = [];
    const length = recipes.length;

    for (let i = 0; i < length; i++) {
      const formatedResponse = await this.parseRecipeDataForResponse(
        recipes[i],
      );
      res.push(formatedResponse);
    }

    return res;
  }

  async createRecipe(recipeDto: CreateRecipe, image: any) {
    const {
      alternate_ingredients,
      ingredients,
      userId,
      ...dtoWithoutIngredients
    } = recipeDto;

    const parsedIngredients =
      await this.ingredientsService.parseAndSaveIngredients(
        JSON.parse(ingredients),
        JSON.parse(alternate_ingredients),
      );

    let filename: string | null = null;
    if (image) {
      filename = await this.filesService.createFile(image);
    }

    const convertedDto = {
      likes: 0,
      ...dtoWithoutIngredients,
      difficulty: +dtoWithoutIngredients.difficulty,
      image: filename,
      ingredients: parsedIngredients,
    };

    try {
      await this.databaseService.user.update({
        where: { id: +userId },
        data: {
          created_recipes: {
            create: convertedDto,
          },
        },
      });
      return true;
    } catch (e) {
      throw new HttpException(
        { message: 'Ошибка сервера' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllRecipes() {
    const recipes = await this.databaseService.recipe.findMany({
      include: { user: { select: { id: true, username: true } } },
    });
    console.log(recipes);

    return this.createResponse(recipes);
  }

  async getAllRecipesByIdList(favoriteList: number[]) {
    const recipes = await this.databaseService.recipe.findMany({
      where: { id: { in: favoriteList } },
      include: { user: { select: { id: true, username: true } } },
    });

    

    return this.createResponse(recipes);
  }

  async getOneRecipe(id: number) {
    const recipe = await this.databaseService.recipe.findFirst({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true },
        },
      },
    });

    if (!recipe) {
      return new NotFoundException();
    }

    const formatedResponse = await this.parseRecipeDataForResponse(recipe);

    return formatedResponse;
  }

  async updateRecipe(recipeId: number, recipeDto: CreateRecipe, image: any) {
    const {
      alternate_ingredients,
      ingredients,
      userId,
      ...dtoWithoutIngredients
    } = recipeDto;

    const parsedIngredients =
      await this.ingredientsService.parseAndSaveIngredients(
        JSON.parse(ingredients),
        JSON.parse(alternate_ingredients),
      );

    let filename: string | null = null;
    if (image) {
      filename = await this.filesService.createFile(image);
    }

    let convertedDto: any = {
      ...dtoWithoutIngredients,
      difficulty: +dtoWithoutIngredients.difficulty,
      ingredients: parsedIngredients,
    };

    if (image) {
      convertedDto = { ...convertedDto, image: filename };
    }

    try {
      await this.databaseService.user.update({
        where: { id: +userId },
        data: {
          created_recipes: {
            update: { where: { id: recipeId }, data: convertedDto },
          },
        },
      });
      return true;
    } catch (e) {
      throw new HttpException(
        { message: 'Ошибка сервера' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteRecipe(recipeId: number) {
    return this.databaseService.recipe.delete({ where: { id: recipeId } });
  }

  async filteredRecipes(dto: Filters) {
    const { ingredients, rate, search, sortBy } = dto;

    let ingredientsFilter, rateFilter, searchFilter;
    let orIngredients = { OR: [] };
    let orderBy = { orderBy: [] };
    let and = [];

    if (ingredients && ingredients.length > 0) {
      ingredientsFilter = ingredients.map((item) => {
        return {
          ingredients: {
            contains: item,
          },
        };
      });
      orIngredients.OR = ingredientsFilter;
      and.push(orIngredients);
    }

    if (rate) {
      rateFilter = { difficulty: { gte: rate[0], lte: rate[1] } };
      and.push(rateFilter);
    }

    if (search) {
      searchFilter = { title: { contains: search } };
      and.push(searchFilter);
    }

    switch (sortBy) {
      case 1:
        orderBy.orderBy.push({ created_at: 'desc' });
        break;
      case 2:
        orderBy.orderBy.push({ title: 'asc' });
        break;
      case 3:
        orderBy.orderBy.push({ difficulty: 'desc' });
        break;
      case 4:
        orderBy.orderBy.push({ difficulty: 'asc' });
        break;
      case 5:
        orderBy.orderBy.push({ likes: 'desc' });
        break;
    }

    const recipes = await this.databaseService.recipe.findMany({
      where: { AND: and, ingredients: {} },
      orderBy: orderBy.orderBy,
    });

    return this.createResponse(recipes)
  }
}
