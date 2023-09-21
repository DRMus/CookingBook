import { message } from "antd";
import axios from "../../core/axios";

/** Создание рецепта */
export async function createRecipe(dto: FormData) {
  try {
    return await axios.post<boolean>("/recipes/create", dto, {headers: {"Content-Type": "multipart/form-data"}});
  } catch (e: any) {
    message.error(e.response.message);
  }
}