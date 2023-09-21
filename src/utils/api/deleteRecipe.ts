import { message } from "antd";
import axios from "../../core/axios";
import { IRecipe } from "../../interfaces/IRecipe";

/** Удаление выбранного рецепта */
export async function deleteRecipe(id: number) {
  try {
    return await axios.delete<IRecipe>(`/recipes/delete/${id}`);
  } catch (e: any) {
    message.error(e.response.message);
  }
}