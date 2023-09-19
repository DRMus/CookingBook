import { TableData } from "../interfaces";
import { IRecipe } from "../interfaces/IRecipe";

export const makeRecipesListForTable = (recipesList: IRecipe[]): TableData[] => {
  const result: TableData[] = recipesList.map((recipe) => {
    return {
      key: `${recipe.id}`,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients.map((item) => item.name),
      likes: recipe.likes,
      title: recipe.title,
    }
  })
  return result
}