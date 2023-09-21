import { ICreateRecipe, ICreateRecipeIngredients, IRecipe } from "../interfaces/IRecipe";

/** Функция создания объекта рецепта для использования данных в форме редактирования */
export function makeRecipeFormData(recipe: IRecipe): ICreateRecipe {
  const ingredients: ICreateRecipeIngredients[] = recipe.ingredients.map((ingredient) => {

    /** Ищем у ингредиента алтернативный ингредиент.
     *  Если его нет, то оставляем поле пустым
     */
    const altIngredients = recipe.alternate_ingredients.find(
      (item) => item.ingredient_id === ingredient.id
    );
    return {
      ingredient: ingredient.name,
      alternate_ingredient: altIngredients ? altIngredients.name : "",
    };
  });

  return {
    cooking_order: recipe.cooking_order,
    difficulty: recipe.difficulty,
    title: recipe.title,
    description: recipe.description || undefined,
    image: undefined,
    ingredients,
  };
}
