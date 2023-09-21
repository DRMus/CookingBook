import { ITagAltIngredients, ITagIngredient } from "../interfaces";
import { IAlternateIngredient, IIngredient } from "../interfaces/IRecipe";

/** Функция создания комплексных тэгов с альтернативными ингредиентами
 *  для отображения их на странице рецепта
 */
export function makeTagIngredients(
  ingredients: IIngredient[],
  altIngredients: IAlternateIngredient[]
): ITagIngredient[] {
  /** Копируем массив ингредиентов, чтобы его не мутировать */
  const ingredientsCopy = [...ingredients];

  const convertedIngredients: ITagIngredient[] = ingredientsCopy.map((ingredient) => {
    /** Ищем альтернгативные ингредиенты для данного ингредиента */
    const innerAltIngredients = altIngredients.find(
      (altIngredient) => altIngredient.ingredient_id === ingredient.id
    );

    let convertedAltIngredients: ITagAltIngredients | undefined = undefined;

    /** Если альтернативных ингредиентов нет, то оставляем поле пустым */
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
