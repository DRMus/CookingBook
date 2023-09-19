import { ITagIngredient } from "../interfaces";
import { IAlternateIngredient, IIngredient } from "../interfaces/IRecipe";

export function makeTagIngredients(
  ingredients: IIngredient[],
  altIngredients: IAlternateIngredient[]
): ITagIngredient[] {
  const ingredientsCopy = [...ingredients];

  const convertedIngredients: ITagIngredient[] = ingredientsCopy.map((ingredient) => {
    const innerAltIngredients = altIngredients.find(
      (altIngredient) => altIngredient.ingredient_id === ingredient.id
    );

    let convertedAltIngredients = undefined;

    if (innerAltIngredients) {
      convertedAltIngredients = {
        id: innerAltIngredients.id,
        names: innerAltIngredients.name.split(","),
      };
    }

    return {
      id: ingredient.id,
      name: ingredient.name,
      altInredients: convertedAltIngredients,
    };
  });

  return convertedIngredients;
}
