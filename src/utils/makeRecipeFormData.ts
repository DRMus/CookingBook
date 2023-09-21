import { ICreateRecipe, ICreateRecipeIngredients, IRecipe } from "../interfaces/IRecipe";

export function makeRecipeFormData(recipe: IRecipe): ICreateRecipe {
  const ingredients: ICreateRecipeIngredients[] = recipe.ingredients.map((ingredient) => {
    const altIngredients = recipe.alternate_ingredients.find((item) => item.ingredient_id === ingredient.id);
    return {
      ingredient: ingredient.name,
      alternate_ingredient: altIngredients ? altIngredients.name : ""
    }
  })
  
  return {
    cooking_order: recipe.cooking_order,
    difficulty: recipe.difficulty,
    title: recipe.title,
    description: recipe.description || undefined,
    image: undefined,
    ingredients
  }
}