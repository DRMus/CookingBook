import { ICreateRecipe } from "../interfaces/IRecipe";

interface DtoForFormData {
  image: File | undefined;
    userId: number;
    ingredients: {
        id: number;
        name: string;
    }[];
    alternate_ingredients: {
        ingredient_id: number;
        names: string[];
    }[];
    cooking_order: string;
    description?: string | undefined;
    difficulty: number;
    title: string;
}

export function makeRecipeRequestData(data: ICreateRecipe, userId: number) {
  const ingredients = data.ingredients.map((item, index) => {
    return {
      id: index,
      name: item.ingredient,
    };
  });

  const alternate_ingredients = data.ingredients.map((ingredient, ingredientIdx) => {
    return {
      ingredient_id: ingredientIdx,
      names: ingredient.alternate_ingredient.split(",").filter(item => item),
    };
  });

  const dto: DtoForFormData = {
    ...data,
    image: data.image?.file.originFileObj as File | undefined,
    userId,
    ingredients,
    alternate_ingredients,
  };

  const formData = new FormData();
  
  Object.keys(dto).forEach((key) => {
    let value = dto[key as keyof DtoForFormData];

    if (!value) {
      return;
    }

    if (typeof value === "number") {
      value = `${value}`
    }

    if (Array.isArray(value)) {
      value = JSON.stringify(value);
    }

    formData.append(key, value)
  })
  
  return formData;
}
