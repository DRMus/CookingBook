import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRecipe } from './dto/Recipe.dto';
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

  async createRecipe(recipeDto: CreateRecipe, image: any) {
    const {
      alternate_ingredients,
      ingredients,
      userId,
      ...dtoWithoutIngredients
    } = recipeDto;

    const parsedIngredients =
      await this.ingredientsService.parseAndSaveIngredients(
        ingredients,
        alternate_ingredients,
      );

    let filename: string | null = null;
    if (image) {
      filename = await this.filesService.createFile(image);
    }

    const convertedDto = {
      likes: 0,
      ...dtoWithoutIngredients,
      image: filename,
      ingredients: parsedIngredients,
    };

    const user = await this.databaseService.user.update({
      where: { id: userId },
      data: {
        created_recipes: {
          create: convertedDto,
        },
      },
    });

    return user;
  }

  async getAllRecipes() {
    const recipes = await this.databaseService.recipe.findMany({include: {user: true}});
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

  async getOneRecipe(id: number) {
    const recipe = await this.databaseService.recipe.findFirst({
      where: { id },
    });

    if (!recipe) {
      return new NotFoundException();
    }

    const formatedResponse = await this.parseRecipeDataForResponse(recipe);

    return formatedResponse;
  }

  async updateRecipe() {}
}
