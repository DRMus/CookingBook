import { FetchingDataTemplate } from ".";
import { IUser } from "./IUser";


export interface IIngredient {
  id: number,
  name: string
}

export interface IAlternateIngredient {
  id: number,
  ingredient_id: number,
  name: string
}

export interface IRecipe extends FetchingDataTemplate {
  user: IUser;
  likes: number;
  title: string;
  description: string | null;
  cooking_order: string;
  difficulty: number;
  ingredients: IIngredient[];
  alternate_ingredients: IAlternateIngredient[];
  image: Blob | null;
}
