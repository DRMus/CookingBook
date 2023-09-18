import { ApiProperty } from '@nestjs/swagger';

export type Ingredient = {
  id: number;
  name: string;
};

export type AlternateIngredient = {
  ingredient_id: number;
  names: string[];
};

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

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 2 })
  difficulty: number;

  @ApiProperty({ example: 'Кладем это, потом то' })
  cooking_order: string;

  @ApiProperty({
    example: ingredientExample,
  })
  ingredients: Ingredient[];

  @ApiProperty({
    example: alternateIngredientExample,
  })
  alternate_ingredients: AlternateIngredient[];

  @ApiProperty({ example: 'Классный рецепт' })
  description?: string;
}
