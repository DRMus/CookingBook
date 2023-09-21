import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { FetchingDataTemplate } from ".";
import { IUser } from "./IUser";

export interface IIngredient {
  id: number;
  name: string;
}

export interface IAlternateIngredient {
  id: number;
  ingredient_id: number;
  name: string;
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
  image?: string;
}

export interface ICreateRecipeIngredients {
  ingredient: string;
  alternate_ingredient: string;
}

export interface ICreateRecipe {
  cooking_order: string;
  description?: string;
  difficulty: number;
  image?: UploadChangeParam<UploadFile<any>>;
  title: string;
  ingredients: ICreateRecipeIngredients[];
}
