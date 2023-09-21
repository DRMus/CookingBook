import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { FetchingDataTemplate } from ".";
import { IUser } from "./IUser";

/** Интерфейс полученных игредиентов с сервера */
export interface IIngredient {
  id: number;
  name: string;
}

/** Интерфейс полученных альтернативных игредиентов с сервера */
export interface IAlternateIngredient {
  id: number;
  ingredient_id: number;
  name: string;
}

/** Интерфейс полученных рецептов с сервера */
export interface IRecipe extends FetchingDataTemplate {
  user: IUser;
  likes: number;
  title: string;
  description: string | null;
  cooking_order: string;
  difficulty: number;
  ingredients: IIngredient[];
  alternate_ingredients: IAlternateIngredient[];
  image?: string;
}

/** Интерфейс игредиентов для формы создания и редактирования рецептов */
export interface ICreateRecipeIngredients {
  ingredient: string;
  alternate_ingredient: string;
}

/** Интерфейс формы для создания и редактирования рецептов */
export interface ICreateRecipe {
  cooking_order: string;
  description?: string;
  difficulty: number;
  image?: UploadChangeParam<UploadFile<any>>;
  title: string;
  ingredients: ICreateRecipeIngredients[];
}
