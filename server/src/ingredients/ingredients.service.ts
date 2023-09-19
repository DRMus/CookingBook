import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Ingredient, AlternateIngredient } from 'src/recipes/dto/Recipe.dto';

@Injectable()
export class IngredientsService {
  constructor(private readonly databaseService: DatabaseService) {}

  private async createIngredient(ingredientName: string) {
    const ingredient = await this.databaseService.ingredient.create({
      data: { name: ingredientName },
    });
    return ingredient;
  }

  private async createAlternateIngredient(ingredientId: number, name: string) {
    const ingredient = await this.databaseService.alternateIngredient.create({
      data: { ingredient_id: ingredientId, name },
    });
    return ingredient;
  }

  private async saveAlternateIngredients(
    ingredientId: number,
    names: string[],
  ) {
    await this.createAlternateIngredient(ingredientId, names.join(','));
  }

  private async getIngredient(ingredientId: number) {
    const ingredient = await this.databaseService.ingredient.findFirst({
      where: { id: ingredientId },
    });
    return ingredient;
  }

  private async getAlternateIngredients(ingredientId: number) {
    const altIngredients =
      await this.databaseService.alternateIngredient.findFirst({
        where: { ingredient_id: ingredientId },
      });
    return altIngredients;
  }

  async parseAndSaveIngredients(
    ingredientsDto: Ingredient[],
    alternateIngredientsDto: AlternateIngredient[],
  ) {
    /** Составление списка ингредиентов по id
     *  (реализованно через for для лучшей читабельности)
     */
    let receivedIngredients: number[] = [];
    const ingredientsLength = ingredientsDto.length;
    for (let i = 0; i < ingredientsLength; i++) {
      const ingredient = await this.createIngredient(ingredientsDto[i].name);

      const altIngredient = alternateIngredientsDto.find(
        (item) => ingredientsDto[i].id === item.ingredient_id,
      );

      if (altIngredient) {
        await this.saveAlternateIngredients(ingredient.id, altIngredient.names);
      }
      receivedIngredients.push(ingredient.id);
    }
    return receivedIngredients.join(',');
  }

  async parseAndGetIngredients(ingredientsString: string) {
    const splitedIngredients = ingredientsString.split(',');
    const length = splitedIngredients.length;

    const ingredientsArray: Ingredient[] = [];
    const altIngredientsArray = [];

    for (let i = 0; i < length; i++) {
      const ingredient = await this.getIngredient(+splitedIngredients[i]);
      const altIngredients = await this.getAlternateIngredients(ingredient.id);

      ingredientsArray.push(ingredient);
      if (altIngredients) {
        altIngredientsArray.push(altIngredients);
      }
    }

    return {
      ingredients: ingredientsArray,
      alternate_ingredients: altIngredientsArray,
    };
  }

  async getAllIngredients() {
    const result = await this.databaseService.ingredient.findMany();
    const filtredIngredients = result.filter((item, index) => {
      return result.findIndex((foundIngredient) => foundIngredient.name === item.name) === index
    })
    
    return filtredIngredients
  }
}
