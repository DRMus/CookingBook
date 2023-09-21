import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '@prisma/client';

export type Ingredient = {
  id: number;
  name: string;
};

export type AlternateIngredient = {
  ingredient_id: number;
  names: string[];
};

export type Filters = {
  ingredients?: string[]
  rate?: [number, number]
  search?: string,
  
  /** 1 - по новизне
   *  2 - по алфавиту
   *  3 - по убыванию сложности
   *  4 - по возрастанию сложности
   *  5 - по количеству лайков
   */
  sortBy?: 1 | 2 | 3 | 4 | 5
}

const ingredientExample: Ingredient[] = [
  { id: 1, name: 'Сахар' },
  { id: 2, name: 'Мука' },
];

const alternateIngredientExample: AlternateIngredient[] = [
  { ingredient_id: 1, names: ['Тростниковый сахар', 'Какой-то сахар'] },
];

export class CreateRecipe {
  @ApiProperty({ example: 'Рецепт 1' })
  title: string;

  @ApiProperty({ example: "1" })
  userId: string;

  @ApiProperty({ example: "2" })
  difficulty: string;

  @ApiProperty({ example: 'Кладем это, потом то' })
  cooking_order: string;

  @ApiProperty({
    example: JSON.stringify(ingredientExample),
  })
  ingredients: string;

  @ApiProperty({
    example: JSON.stringify(alternateIngredientExample),
  })
  alternate_ingredients: string;

  @ApiProperty({ example: 'Классный рецепт' })
  description?: string;
}

export class RecipeResponse implements Recipe {
  id: number;
  userId: number;
  likes: number;
  title: string;
  description: string;
  cooking_order: string;
  difficulty: number;
  ingredients: string;
  image: string;
  created_at: Date;
}


